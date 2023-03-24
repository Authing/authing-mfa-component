import { React } from 'shim-react'

import { message, Spin } from 'shim-antd'

import { IAuthingPublicConfig, IAuthingMFATriggerData, IAuthingFunc } from '../types'

import { i18n } from '../locales'

import * as facePlugin from 'face-api.js'

import { associateFace, verifyFace, uploadFile } from '../apis'

import { SubmitButton } from './SubmitButton'

import { LazyloadImage } from './LazyloadImage'

import { useAuthingMFAContext } from '../contexts'

import { loopFunc } from '../helpers'

const { useState, useRef, useEffect, useCallback } = React

interface IFaceProps {
  mfaTriggerData: IAuthingMFATriggerData
  publicConfig: IAuthingPublicConfig
  setMFASelectorVisible: React.Dispatch<React.SetStateAction<boolean>>
}

type FaceState = 'ready' | 'identifying' | 'retry'

const inputSize = 512

const scoreThreshold = 0.5

export const FACE_SCORE = 0.65

const devicesConstraints = {
  video: {
    width: 210,
    height: 210
  }
}

export function Face(props: IFaceProps) {
  const { publicConfig, mfaTriggerData } = props

  const { t } = i18n

  const authingMFAContext = useAuthingMFAContext()

  const [faceState, setFaceState] = useState<FaceState>('ready')

  const [percent, setPercent] = useState(0) // 识别进度（相似性）

  const videoRef = useRef<HTMLVideoElement>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const interval = useRef<NodeJS.Timeout | undefined>()

  const p1 = useRef<string>() // p1 key

  const p2 = useRef<string>() // p2 key

  const cooldown = useRef<number>(0) // p2 cooldown, * 500ms

  const cdnBase = publicConfig.cdnBase

  const useDashoffset = (percent: number) => {
    // 接受 0 - 1，返回 0-700 之间的偏移量
    const offset = percent * 7
    // 在识别成功的时候，返回绿色
    const dashStyle = {}
    return { offset, dashStyle }
  }

  const { offset, dashStyle } = useDashoffset(percent)

  const _FACE_SCORE = publicConfig?.mfa?.faceScore ?? FACE_SCORE

  useEffect(() => {
    // 载入 cdn
    getCurrentFaceDetectionNet().loadFromUri(
      `${cdnBase}/face-api/v1/tiny_face_detector_model-weights_manifest.json`
    )

    if (faceState !== 'identifying') {
      return // 不存在 video dom，不要去尝试了
    }

    const devicesContext = navigator.mediaDevices.getUserMedia(devicesConstraints)

    devicesContext
      .then(stream => {
        videoRef.current!.srcObject = stream
      })
      .catch(e => {
        const msg = faceErrorMessage(e)
        message.error(t(msg))
      })

    return () => {
      interval.current && clearInterval(interval.current)
    }
  }, [faceState, interval, publicConfig, cdnBase, t])

  // 上传文件
  const uploadImage = async (blob: Blob) => {
    const formData = new FormData()
    formData.append('folder', 'photos')
    formData.append('file', blob, 'personal.jpeg')

    const result = await uploadFile({
      query: '?folder=photos&private=true',
      formData
    })

    const key = result.data?.key || ''

    return key
  }

  // get base 64
  const getBase64 = (videoDom: any) => {
    const canvas = canvasRef.current!
    const ctx = canvas!.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(videoDom, 0, 0, canvas.width, canvas.height)
    const base64Data = canvas.toDataURL('image/jpeg', 1.0)
    return base64Data
  }

  const faceBind = async () => {
    const requestData = {
      photoA: p1.current!,
      photoB: p2.current!,
      mfaToken: props.mfaTriggerData.mfaToken
    }
    const result = await associateFace(requestData)

    const { code, data, message: tips } = result

    if (code === 200) {
      return loopFunc(authingMFAContext?.events.onSuccess as IAuthingFunc, code, data)
    }

    if (code === 1700 || code === 1701 || code === 1702) {
      p1.current = undefined

      p2.current = undefined

      interval.current = undefined

      cooldown.current = 0

      return setFaceState('retry')
    }

    loopFunc(authingMFAContext?.events.onFail as IAuthingFunc, tips)
  }

  const faceCheck = async () => {
    const requestData = {
      photo: p1.current!,
      mfaToken: props.mfaTriggerData.mfaToken
    }

    const result = await verifyFace(requestData)

    const { data, code } = result

    if (code === 1700 || code === 1701 || code === 1702) {
      p1.current = undefined

      p2.current = undefined

      interval.current = undefined

      cooldown.current = 0

      setFaceState('retry')

      return
    }

    if (code === 200) {
      loopFunc(authingMFAContext?.events.onSuccess as IAuthingFunc, code, data)
    }
  }

  // bind 的情况
  const goToBindScene = (key: string) => {
    if (!p1.current) {
      p1.current = key
    } else {
      if (cooldown.current > 0) {
        cooldown.current -= 1
      }
      if (cooldown.current <= 0) {
        p2.current = key
        // 彻底上传完了，应该走验证了
        interval.current && clearInterval(interval.current)
        faceBind()
      }
    }
  }

  // goToCheck 的情况
  const goToCheckScene = (key: string) => {
    p1.current = key
    interval.current && clearInterval(interval.current)
    faceCheck()
  }

  // 识别成功，自动前进到下一个步骤
  const quitIdentifying = (blob: Blob) => {
    setPercent(100)
    uploadImage(blob).then(key => {
      if (mfaTriggerData.faceMfaEnabled === true) {
        goToCheckScene(key)
      } else {
        goToBindScene(key)
      }
    })
  }

  const autoShoot = useCallback(async () => {
    if (!interval.current) {
      interval.current = setInterval(() => autoShoot(), 500)
    }
    const videoDom = videoRef.current!
    if (videoDom?.paused || videoDom?.ended || !isFaceDetectionModelLoaded()) {
      return
    }
    const options = getFaceDetectorOptions()

    const { detectSingleFace } = facePlugin

    const result = await detectSingleFace(videoDom, options)

    if (result) {
      if (result.score > _FACE_SCORE) {
        const base64Data = getBase64(videoDom)
        const blob = dataURItoBlob(base64Data)
        quitIdentifying(blob) // 识别成功，退出识别
      } else {
        // 识别失败，但是有结果，设置相似性
        setPercent(() => {
          return (result.score / _FACE_SCORE) * 100
        })
        // ('识别失败，但是有结果，设置相似性', percent)
      }
    } else {
      setPercent(10)
    }
  }, [])

  return (
    <div>
      <h3 className="authing-mfa-title">{t('mfa.mfaCertification')}</h3>
      {faceState === 'ready' ? (
        <>
          <p className="authing-mfa-tips">
            {props.mfaTriggerData?.faceMfaEnabled ? t('mfa.faceCheck') : t('mfa.faceText2')}
          </p>

          <LazyloadImage
            src={`${cdnBase}/face.png`}
            placeholder={<Spin className="authing-mfa-face-image" />}
            className="authing-mfa-face-image"
            width={247}
            height={131}
          ></LazyloadImage>

          <SubmitButton
            onClick={() => {
              if (navigator.mediaDevices) {
                setFaceState('identifying')
                autoShoot()
              } else {
                message.error(t('mfa.mediaDevicesSupport'))
              }
            }}
            text={t('mfa.faceText3') as string}
            className="mfa-face"
          />
        </>
      ) : (
        <p className="authing-mfa-tips">{t('mfa.faceCheck')}</p>
      )}

      <div
        className="authing-mfa-face-identifying"
        style={{
          display: faceState !== 'ready' ? 'flex' : 'none'
        }}
      >
        <video
          className="video-round"
          ref={videoRef}
          style={{ transform: 'rotateY(180deg)' }}
          id="inputVideo"
          autoPlay
          muted
          playsInline
        />
        <div
          className="video-round mesh"
          style={{
            display: faceState === 'retry' ? 'flex' : 'none'
          }}
          onClick={() => {
            setFaceState('identifying')
            setPercent(0)
            autoShoot()
          }}
        >
          {t('mfa.faceText4')}
        </div>

        <div className="video-round ring">
          <svg width={240} height={240} fill="none">
            <circle
              className="svg-circle-running"
              style={dashStyle}
              strokeDasharray={700} // 根据周长做 0-700 之间的数值表示准确率
              strokeDashoffset={700 - offset} // 处理这个 offset, 0-700之间的数
              cx={120}
              cy={120}
              r={110}
            />
          </svg>
        </div>
      </div>

      <canvas
        style={{
          width: 210,
          height: 210,
          opacity: 0,
          position: 'absolute',
          display: 'none'
        }}
        ref={canvasRef}
      />
    </div>
  )
}

function getCurrentFaceDetectionNet() {
  const { nets } = facePlugin
  return nets.tinyFaceDetector
}

export function getFaceDetectorOptions() {
  const { TinyFaceDetectorOptions } = facePlugin
  return new TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

export function isFaceDetectionModelLoaded() {
  return !!getCurrentFaceDetectionNet().params
}

export function dataURItoBlob(base64Data: any) {
  let byteString
  if (base64Data.split(',')[0].indexOf('base64') >= 0) byteString = atob(base64Data.split(',')[1])
  else byteString = unescape(base64Data.split(',')[1])
  const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  return new Blob([ia], { type: mimeString })
}

type FaceErrorName =
  | 'NotAllowedError'
  | 'AbortError'
  | 'NotReadableError'
  | 'OverconstrainedError'
  | 'SecurityError'

interface FaceErrorMessage extends DOMException {
  name: FaceErrorName
}

function faceErrorMessage(error: FaceErrorMessage) {
  if (error.name === 'NotAllowedError') {
    return 'mfa.AuthorizationCamera'
  }

  if (error.name === 'SecurityError') {
    return 'mfa.checkPreferences'
  }

  if (error.name === 'OverconstrainedError') {
    return 'mfa.requireError'
  }

  return 'mfa.hardwareSupport'
}
