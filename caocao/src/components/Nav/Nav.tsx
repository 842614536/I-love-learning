
import { Toolbar, Button, Box } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment'
import { currentChatInfoAtom } from '@/store/chatContent'
import { useSetRecoilState } from 'recoil'
const Nav = () => {
  const setCurrentChatInfo = useSetRecoilState(currentChatInfoAtom)  
  const createChat = () => {
    setCurrentChatInfo({
      id: '',
      data: []
    })
  }
  return (
    <Toolbar
      sx={{
        justifyContent: 'space-between',
        alignItems: 'start',
        flexDirection: 'column',
      }}
    >
      <Box sx={{p: '30px 0px', fontSize: '20px'}}>曹操Cao·cao</Box>
      <Box>
        <Button onClick={createChat} variant="contained" startIcon={<AddCommentIcon />}>
          新的对话
        </Button>
      </Box>
    </Toolbar>
  )
}

export default Nav
