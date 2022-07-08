// 技术栈类型
export type TechnologyClassify = 'react' | 'vue' | 'git' | 'ts' | ''

export type QueryItemType = 'text' | 'select' | 'date' | 'dateSingle'

export interface SelectOption {
  label: string,
  value: string | number | boolean
}

export interface QueryItem {
  type: QueryItemType,
  prop: string,
  label: string,
  props?: Array<string>,
  span?: number | string,
  placeholder?: string,
  multiple?: boolean,
  options?: Array<SelectOption>, // todo 可选怎么变必选
  editable?: boolean,
  clearable?: boolean,
  transfer?: boolean
}