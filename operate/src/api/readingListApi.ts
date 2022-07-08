import { ReadingForm } from '@/views/ReadingList/ReadingListType'
import axios from 'axios'

// todo /operate 改为项目配置  添加到axios 拦截器中
export const saveReadingList = (data: ReadingForm) => {
  return axios.post(`http://lpf.com:8040/operate/reading-list/save`, data).then(res => res.data)
}

export const queryReadingList = (data: any) => {
  return axios.post(`http://lpf.com:8040/operate/reading-list/query`, data).then(res => res.data)
}

export const deleteReadingList = (id: string) => {
  return axios.get(`http://lpf.com:8040/operate/reading-list/delete?id=${id}`).then(res => res.data)
}

export const editReadingList = (data: ReadingForm) => {
  return axios.post(`http://lpf.com:8040/operate/reading-list/edit`, data).then(res => res.data)
}