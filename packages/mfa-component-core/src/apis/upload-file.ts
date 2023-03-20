import { post } from '../request'

interface UploadFileData {
  query?: string
  formData: any
}

export async function uploadFile(data: UploadFileData) {
  const { formData, query } = data

  return await post<{
    key: string
    url: string
  }>({
    path: '/api/v2/upload',
    query,
    data: formData,
    config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  })
}
