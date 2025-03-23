import { Box } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil'
import { systemConfigAtom } from '@/store/config'
import ChatWrapper from '@/components/ChatWrapper';
import ContentWrapper from '@/components/ContentWrapper';
import Header from '../ContentWrapper/Header'
import { currentChatInfoAtom } from '@/store/chatContent';

const Main = () => {
  const [ {drawerWidth} ] = useRecoilState(systemConfigAtom)
  const currentChatInfo = useRecoilValue(currentChatInfoAtom)
  return (
    <Box
      className='sdf'
      component="main"
      sx={{
        flexGrow: 1,
        width: `calc(100% - ${drawerWidth}px)`,
        backgroundColor: 'background.paper',
        overflow: 'hidden'
      }}
    >
      {currentChatInfo.id && <Header />}
      <ContentWrapper />
      <ChatWrapper />
    </Box>
  )
}

export default Main
