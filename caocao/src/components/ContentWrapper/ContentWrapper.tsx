

import { useRecoilValue } from 'recoil'
import { chatContentSelector } from "@/store/chatContent"
import { Box, CircularProgress, Avatar } from '@mui/material'
import './ContentWrapper.less'
import Logo from '@/static/images/logo.jpg'
import { systemConfigAtom } from '@/store/config'
import MarkdownRenderer from '../MarkDown/MarkDown'
import { useEffect, useRef } from 'react'

const ContentWrapper = () => {
  const currentChatContent = useRecoilValue(chatContentSelector)
  const { contentHeight } = useRecoilValue(systemConfigAtom)
  const scrollContainerRef = useRef(null)
  const messagesEndRef = useRef(null)
  const autoScroll = useRef(true);
  
  const renderAnswer = (item: ChatContentItem) => {
    if (item.loading) {
      return (
        <>
          <Avatar className='logo' src={Logo} />
          <CircularProgress size='30px'/>
        </>
      )
    }
    return (
      <>
        <Avatar className='logo' src={Logo} />
        <MarkdownRenderer markdown={item.content} />
        {/* <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{item.content}</ReactMarkdown> */}
      </>
    )
  }
  useEffect(() => {
    if (autoScroll.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [currentChatContent, autoScroll.current])

  // 监听用户滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;

      // 如果用户滚动到接近底部，恢复自动滚动
      if (isNearBottom) {
        autoScroll.current = true;
      } else {
        autoScroll.current = false;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      ref={scrollContainerRef}
      className='my-content-container'
      sx={{
        height: currentChatContent.length === 0 ? '30vh' : contentHeight,
      }}
    >
      <Box className='my-content-wrapper'>
        {
          currentChatContent.map((item: ChatContentItem) => (
            <Box
              className={`my-content${item.type === 'question' ? '-question' : '-answer'}`}  
              sx={{ color: 'text.primary' }}
              key={item.time + 'qa'}
            >
              {item.type === 'question' ? item.content : renderAnswer(item)}
            </Box>
          ))
        }
      </Box>
      <Box ref={messagesEndRef} />
    </Box>
  )
}

export default ContentWrapper
