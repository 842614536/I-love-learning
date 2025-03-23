import { Box, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import { useEffect, useState } from 'react'
import useConfirmDialog from '@/hooks/useDialog'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { historyListAtom, historyListSelector } from '@/store/historyList'
import { currentChatInfoAtom } from '@/store/chatContent'

// 侧边栏展示的(...) 操作按钮
const Manipulate = (props: {id: string}) => {
  const [showConfirm, renderConfirm] = useConfirmDialog()
  const [isShowMore, setIsShowMore] = useState(false)
  const setHistoryList = useSetRecoilState(historyListAtom)
  const historyList = useRecoilValue(historyListSelector)
  const [currentChatInfo, setCurrentChatInfo] = useRecoilState(currentChatInfoAtom)
  const showMore = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    setIsShowMore(true)
  }

  const deleteAction = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    showConfirm({
      title: '永久删除对话',
      content: '删除后，该对话将不可恢复。确认删除吗？',
      affirmButtonColor: 'error',
      onConfirm: () => {

        let list:HistoryListItem[] = historyList.filter((item: HistoryListItem) => item.id !== props.id)
        window.localStorage.removeItem('caocao_' + props.id)
        setHistoryList(list)
        
        // 如果删的是当前对话框 就跳回到新对话框
        if (currentChatInfo.id === props.id) {
          setCurrentChatInfo({
            id: '',
            data: []
          })
        }
      }
    })
  }

  useEffect(() => {
    document.addEventListener('click', () => {
      setIsShowMore(false)
    }, false)
  })

  return (
    <>
      {
        !isShowMore && (
          <IconButton sx={{position: 'absolute', top: '5px', right: '10px'}} size='small' onClick={showMore}>
            <MoreVertIcon />
          </IconButton>
        )
      }
      <Box sx={{
        transition: isShowMore ? 'right 0.3s' : '',
        position: 'absolute',
        right: isShowMore ? '8.5px' : '-120px',
        top: '4px',
        padding: '4px 0px 4px 50px',
        borderRadius: '10px',
        background: 'linear-gradient(90deg, rgba(33,35,39, 0) 0%, #212327 100%)'
      }}>
        <IconButton size='small'>
          <DriveFileRenameOutlineIcon fontSize='small' />
        </IconButton>
        <IconButton onClick={deleteAction} size='small'>
          <DeleteIcon fontSize='small' color='error' />
        </IconButton>
      </Box>
      {renderConfirm({})}
    </>
  )
}

export default Manipulate