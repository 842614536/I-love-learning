type Theme = 'light' | 'dark' | 'system'

interface SystemConfig {
  drawerWidth: number
  drawerOpen: boolean
  chatWrapHeight: string
  contentHeaderHeight: string
  contentHeight: string
  theme: Theme
}

interface HistoryListItem {
  id: string
  title: string
}

interface ChatContentItem {
  content: string
  type: 'answer' | 'question'
  time: string
  loading?: boolean
}

type ChatContentList = ChatContentItem[]

interface CurrentChatInfo {
  id: string
  data: ChatContentList
}

interface ConfirmDialog {
  cancelText?: string
  affirmText?: string
  affirmButtonColor?: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  title?: string
  Content?: any
  onConfirm?: () => void
}