import { ReadingForm } from '@/views/ReadingList/ReadingListType'
import axios from 'axios'

export const saveReadingList = (data: ReadingForm) => {
  return axios.post(`/reading-list/save`, data)
}
