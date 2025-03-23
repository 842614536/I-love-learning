import 'react'
import { Drawer, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil'
import { historyListSelector } from '@/store/historyList'
import { systemConfigAtom } from '@/store/config'
import { currentChatInfoAtom } from '@/store/chatContent'
import Manipulate from './Manipulate'
import Nav from '@/components/Nav'
import UserInfo from '@/components/UserInfo'
import './MenuList.less'

const MenuList = () => {
  const historyList = useRecoilValue(historyListSelector)
  const systemConfig = useRecoilValue(systemConfigAtom)
  const [currentChatInfo, setCurrentChatInfo] = useRecoilState(currentChatInfoAtom)

  const chooseChat = (id: string) => {
    let content:any = JSON.parse(window.localStorage.getItem('caocao_' + id) || '[]')
    setCurrentChatInfo({
      id,
      data: content
    })
  }
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: systemConfig.drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: systemConfig.drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Nav />
      <Box sx={{ overflow: 'auto', flex: '1' }}>
        <List>
          {historyList.map(item => (
            <ListItem 
              sx={{position: 'relative', overflow: 'hidden', height: '50px'}}
              key={item.id}
              disablePadding
            >
              <ListItemButton
                disableRipple
                className={`${item.id === currentChatInfo.id ? 'active' : ''}`}
                onClick={() => chooseChat(item.id)}
                selected={item.id === currentChatInfo.id}
              >
                <ListItemText>
                  <Box className='menu-title'>{item.title}</Box>
                  <Manipulate id={item.id}/>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <UserInfo />
    </Drawer>
  )
}

export default MenuList