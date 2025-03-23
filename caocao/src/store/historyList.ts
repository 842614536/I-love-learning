import { atom, selector } from 'recoil'
import { currentChatInfoAtom } from './chatContent'

export const historyListAtom = atom<HistoryListItem[]>({
  key: 'GETHISTORYLIST',
  default: []
})

export const historyListSelector = selector<HistoryListItem[]>({
  key: 'GETHISTORYLISTSELECTOR',
  get: ({ get }) => {
    let historyList = get(historyListAtom)
    if (historyList.length === 0) {
      let list:any = window.localStorage.getItem('caocao_historyList')
      historyList = list ? JSON.parse(list) : []
    } else {
      window.localStorage.setItem('caocao_historyList', JSON.stringify(historyList))
    }
    return historyList
  }
})

export const currentListItem = selector<HistoryListItem>({
  key: 'GETCURRENTLISTITEM',
  get: ({ get }) => {
    const historyList = get(historyListSelector)
    const currentChatInfo:CurrentChatInfo = get<CurrentChatInfo>(currentChatInfoAtom)
    return historyList.find((item) => item.id === currentChatInfo.id) || {
      id: '',
      title: '',
      data: []
    }
  }
})
