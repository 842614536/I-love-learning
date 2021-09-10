import {ForwardRefExoticComponent} from 'react'
interface p {}

export interface IRouterItem {
  link?: string
  title: string
  name: string
  remark?: string
  children?: Array<IRouterItem>
  icon?: ForwardRefExoticComponent<p>
}

export type IRouter = Array<IRouterItem>

