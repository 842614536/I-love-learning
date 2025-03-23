import { Box, TextField, Button, Avatar, useTheme } from "@mui/material"
import SendIcon from '@mui/icons-material/Send'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import { useState, useRef } from "react"
import { apiChatCreate } from "@/api/chat.service"
import { useRecoilState, useRecoilValue, useSetRecoilState, useRecoilCallback } from 'recoil'
import { currentChatInfoAtom } from "@/store/chatContent"
import { historyListAtom, historyListSelector } from "@/store/historyList"
import { systemConfigAtom } from '@/store/config'
import Logo from '@/static/images/logo.jpg'
import UseAbort from '@/hooks/useAbort'

const ChatWrapper = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [rows, setRows] = useState<number>(1)
  const [content, setContent] = useState<string>('')
  const { chatWrapHeight } = useRecoilValue(systemConfigAtom)
  const [finish, setFinish] = useState<boolean>(true)
  const theme = useTheme()
  const [chatCreate, abort] = UseAbort(apiChatCreate)
  // 跟踪拼音输入状态
  const toggleFocus = (rows: number): void => {
    setRows(rows)
  }
  const [currentChatInfo, setCurrentChatInfo] = useRecoilState(currentChatInfoAtom)
  const setHistoryList = useSetRecoilState(historyListAtom)
  const historyList = useRecoilValue(historyListSelector)

  const reset = () => {
    setContent('')
  }

  const setChatAsync = useRecoilCallback(({ set }) => async () => {
    // 如果正在请求 切换了别的对话,或者创建新对话 就把请求取消了
    const res: any = await chatCreate({ content })
    setLoading(false)
    // 使用 for-await-of 逐块读取流数据
    let time = String(new Date().getTime())
    let data = ''
    setFinish(false)
    for await (const chunk of res) {
      let str = new TextDecoder().decode(chunk)
      if (!str.includes('id')) continue

      str.split('\n\n').forEach(item => {
        if (item.includes('data: ')) {
          data += item.split('data: ')[1]
        }
      })
      set(currentChatInfoAtom, (prevCount: any): any => {
        return {
          id: prevCount.id,
          data: [
            ...prevCount.data.slice(0, -1),
            {
              loading: false,
              content: data,
              type: 'answer',
              time
            }
          ]
        }
      })
    }
    setFinish(true)
  })
  const sendAction = () => {
    let id = currentChatInfo.id
    // 如果当前对话内容是空的, 就创建一个新的对话
    if (!id) {
      id = String(new Date().getTime())
      setHistoryList([{ id, title: content }, ...historyList])
    }

    setCurrentChatInfo({
      id: id,
      data: [
        ...currentChatInfo.data,
        {
          content: content,
          type: 'question',
          time: String(new Date().getTime())
        },
        // 问完问题以后 立刻填充一个回答的占位符用来展示loading, 等实际回答返回后, 再更新对话内容
        {
          loading: true,
          content: '',
          type: 'answer',
          time: String(new Date().getTime() + 111)
        }
      ]
    })
    setLoading(true)
    setChatAsync()
    reset()
  }

  const abortAction = () => {
    abort()
    setLoading(false)
    setFinish(true)
  }
  const keyDownAction = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      sendAction()
    }
  }
  return (
    <>
      <Box
        sx={{
          height: chatWrapHeight,
          width: '80%',
          transition: 'bottom 0.3s ease',
          margin: '0 auto',
          borderRadius: '20px',
          pt: '20px'
        }}
      >
        {
          currentChatInfo.data.length === 0 && (
            <>
              <Box
                sx={{
                  color: 'text.primary',
                  pb: '10px',
                  textAlign: 'center',
                  fontSize: '22px',
                  fontWeight: 'bold'
                }}
              >
                <Avatar sx={{ display: 'inline-block', verticalAlign: 'middle', mr: '10px' }} src={Logo} />
                我是 Cao·cao，很高兴见到你！
              </Box>
              <Box
                sx={{
                  color: 'text.primary',
                  pb: '20px',
                  textAlign: 'center',
                }}
              >
                我不可以帮你写代码、读文件、写作各种创意内容，请别把你的任务交给我~
              </Box>
            </>
          )
        }
        <Box sx={{ position: 'relative' }}>
          <TextField
            onFocus={() => toggleFocus(3)}
            onBlur={() => toggleFocus(1)}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => keyDownAction(e)}
            value={content}
            fullWidth
            rows={rows}
            multiline
            sx={{
              position: 'relative',
            }}
            helperText="内容由 AI 生成，请仔细甄别"
            placeholder="少问点,怪贵的"
            label="请尽情吩咐曹操"
            variant="outlined"
          />
          {
            finish ? (
              <Button
                sx={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '32px',
                  zIndex: 10
                }}
                loading={loading}
                disabled={content.length === 0}
                onMouseDown={sendAction}
                variant="contained"
              >
                <SendIcon />
              </Button>
            ) : (
              <StopCircleIcon 
                sx={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '32px',
                  width: '30px',
                  zIndex: 10,
                  fontSize: '40px',
                  cursor: 'pointer',
                  color: theme.palette.primary.main,
                }}
                onMouseDown={abortAction}
              />
            )
          }
        </Box>
      </Box>
    </>
  )
}

export default ChatWrapper
