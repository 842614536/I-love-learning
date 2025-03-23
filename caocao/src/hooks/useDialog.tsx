import { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Box from "@mui/material/Box"

const useConfirmDialog = () => {
  const [option, setOption] = useState<ConfirmDialog>({
    cancelText: '取消',
    affirmText: '确认',
    affirmButtonColor: 'primary',
    title: '提示',
    Content: ''
  })
  const { cancelText, affirmText, affirmButtonColor, title, Content, onConfirm } = option
  const [open, setOpen] = useState(false)
  // 关闭弹窗
  const handleClose = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    setOpen(false)
  }

  // 确认操作
  const handleConfirm = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    onConfirm && onConfirm()
    setOpen(false)
  }
  const handleOpen = (obj: ConfirmDialog) => {
    setOption({
      ...option,
      ...obj
    })
    setOpen(true)
  }
  const render = () => {
    if (!open) return null
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <Box sx={{background: '#3a3a45'}}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
              <DialogContentText 
                sx={{
                  fontSize: '14px',
                  color: 'text.primary'
                }}
              >{typeof Content === 'string' ? Content : <Content />}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} size="small" variant="outlined">
                { cancelText }
              </Button>
              <Button onClick={handleConfirm} size="small" variant="contained" color={affirmButtonColor} autoFocus>
                { affirmText }
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </div>
    )
  }
  return [handleOpen, render]
}

export default useConfirmDialog