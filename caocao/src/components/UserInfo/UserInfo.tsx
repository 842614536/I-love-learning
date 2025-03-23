import { Paper, Popper, Avatar, Button, Box, FormControlLabel, Switch } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import useConfirmDialog from '@/hooks/useDialog'
import SystemConfig from '@/components/SystemConfig'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import BugReportIcon from '@mui/icons-material/BugReport'
import SourceIcon from '@mui/icons-material/Source'

const RenderDeleteDialog = () => {
  const [delSystemConfig, setDelSystemConfig] = useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDelSystemConfig(event.target.checked)
  };
  return (
    <>
      <Box>删除后，所有对话将不可恢复。确认删除吗？</Box>
      <FormControlLabel
        sx={{ mt: 1 }}
        control={
          <Switch checked={delSystemConfig} onChange={handleChange} />
        }
        label="删除系统配置"
      />
    </>
  )
}

const UserInfo = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const buttonRef = useRef(null)
  const [showConfirm, renderConfirm] = useConfirmDialog()
  const [showSystemConfig, renderSystemConfig] = SystemConfig()

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    setAnchorEl(anchorEl ? null : buttonRef.current)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const clearCache = () => {
    showConfirm({
      title: '永久删除所有数据',
      Content: RenderDeleteDialog,
      affirmButtonColor: 'error',
      onConfirm: () => {
        window.localStorage.clear()
        window.location.reload()
      }
    })
  }
  useEffect(() => {
    document.addEventListener('click', (e) => {
      setAnchorEl(null)
    }, false)
  })
  return (
    <>
      <Box
        sx={{
          p: '10px'
        }}
      >
        <Button
          ref={buttonRef}
          aria-describedby={id}
          onClick={handleClick}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'start',
            borderRadius: '14px'
          }}
        >
          <Avatar sx={{ display: 'inline-block', verticalAlign: 'middle', mr: '10px' }} />
          <Box>个人信息</Box>
        </Button>
      </Box>
      <Popper
        placement='top-start'
        sx={{
          zIndex: '1200'
        }}
        id={id} open={open} anchorEl={anchorEl}>
        <Paper sx={{transform: 'translateY(-10px)', p: '5px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
          <Button startIcon={<SourceIcon />} sx={{width: '140px', color: 'text.primary'}} onClick={clearCache}>看看源码</Button>
          <Button startIcon={<BugReportIcon />} sx={{width: '140px', color: 'text.primary'}} onClick={clearCache}>报个bug</Button>
          <Button startIcon={<CleaningServicesIcon />} sx={{width: '140px', color: 'text.primary'}} onClick={clearCache}>清理数据</Button>
          <Button startIcon={<SettingsSuggestIcon />} sx={{width: '140px', color: 'text.primary'}} onClick={() => showSystemConfig(true)}>系统设置</Button>
        </Paper>
      </Popper>
      {renderConfirm({})}
      {renderSystemConfig(true)}
    </>
  )
}

export default UserInfo