import { Box } from "@mui/material"
import { useRecoilValue } from "recoil"
import { currentListItem } from "@/store/historyList"
import { systemConfigAtom } from '@/store/config'
const Header = () => {
  const currentChatInfo = useRecoilValue(currentListItem)
  const { contentHeaderHeight } = useRecoilValue(systemConfigAtom)
  return (
    <Box sx={{
      textAlign: 'center',
      height: contentHeaderHeight,
      lineHeight: contentHeaderHeight,
      fontSize: '18px',
      position: 'sticky',
      color: 'text.primary',
      backgroundColor: 'background.paper',
      top: 0,
      zIndex: 10
    }}>
      {currentChatInfo.title}
    </Box>
  )
}

export default Header