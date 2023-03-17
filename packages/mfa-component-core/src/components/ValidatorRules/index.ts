import { Form } from 'shim-antd'

import { EmailFormItem, PhoneFormItem } from './ValidatorFormItem'

type InternalFormItemType = typeof Form.Item

interface FormItemInterface extends InternalFormItemType {
  Email: typeof EmailFormItem
  Phone: typeof PhoneFormItem
}

const CustomFormItem = Form.Item as FormItemInterface

CustomFormItem.Email = EmailFormItem
CustomFormItem.Phone = PhoneFormItem

export { CustomFormItem }
