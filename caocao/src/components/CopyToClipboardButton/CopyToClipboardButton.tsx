import React, { useState } from 'react'
import { Box, Snackbar, Alert, Portal } from '@mui/material'

function CopyToClipboardButton(props: { textToCopy: any }) {
  const [ open, setOpen ] = useState(false)
  const { textToCopy } = props
  const [ text, setText ] = useState('复制')
  // 复制文本到剪贴板
  const handleCopy = async () => {
      // 创建一个临时的 textarea 元素
      const textarea = document.createElement('textarea')
      textarea.value = typeof textToCopy === 'string' ? textToCopy : textToCopy.current.innerText
      textarea.style.position = 'fixed' // 避免滚动到底部
      document.body.appendChild(textarea)
      textarea.select()
    
      try {
        // 尝试复制
        const successful = document.execCommand('copy')
        if (successful) {
          setText('复制成功')
          setOpen(true)
        } else {
          console.error('复制失败')
        }
      } catch (err) {
        console.error('复制失败:', err)
      } finally {
        // 移除临时的 textarea 元素
        document.body.removeChild(textarea)
      }
  }

  const handleClose = () => {
    setOpen(false)
    setText('复制')
  }

  return (
    <div>
      <Box onClick={handleCopy} sx={{p: '10px', cursor: 'pointer'}}>
        {text}
      </Box>
      <Portal>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            已复制到剪贴板！
          </Alert>
        </Snackbar>
      </Portal>
    </div>
  )
}

export default CopyToClipboardButton
