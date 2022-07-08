import {TechnologyClassify} from '@/typing/common'
import Dayjs from 'dayjs'

export type DialogType = 'add' | 'edit'

// 表单
export interface ReadingForm {
  classify: TechnologyClassify // 技术栈类型
  title: string
  description: string
  address: string
  isDocument: boolean
}

export interface ReadingListItem extends ReadingForm{
  id: string
  createTime: Dayjs
}

export interface CreateReadingProps {
  type: DialogType
}