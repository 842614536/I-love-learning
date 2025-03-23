import { Dialog, DialogTitle, DialogContent, IconButton, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import GeneralConfig from './GeneralConfig'
import CloseIcon from '@mui/icons-material/Close'

const SystemConfig = () => {
  const [open, setOpen] = useState(false)
  const [curTab, setValue] = useState('general')
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const render = () => {
    if (!open) return null
    return (
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>系统设置</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{pb: '20px'}}>
          <Tabs
            sx={{
              width: '500px',
            }}
            value={curTab}
            onChange={handleChange}
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="通用设置" value={'general'} />
            <Tab label="账户管理" value={'account'} />
            <Tab label="服务协议" value={'service'} />
          </Tabs>
          {
            curTab === 'general' ? <GeneralConfig /> : null
          }
        </DialogContent>
      </Dialog>
    )
  }
  return [setOpen, render]
}

export default SystemConfig
