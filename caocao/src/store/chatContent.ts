import { atom, selector } from 'recoil'

export const currentChatInfoAtom = atom<{id: string, data: ChatContentList}>({
  key: 'CURRENTCHATID',
  default: {
    id: '',
    data: []
  },
})

// 改方法就是为了监听当前对话的内容 然后保存到localStorage中
export const chatContentSelector = selector({
  key: 'GETCHATCONTENT',
  get: ({ get }) => {
    const curChatInfo:CurrentChatInfo = get<CurrentChatInfo>(currentChatInfoAtom)
    if (!curChatInfo.id) return []
    window.localStorage.setItem('caocao_' + curChatInfo.id, JSON.stringify(curChatInfo.data))
    return curChatInfo.data
  },
})
