import React, { useRef } from 'react'
import { Box } from '@mui/material'
import 'github-markdown-css'
import './MarkDown.less'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm' // 支持表格、任务列表等
import rehypeHighlight from 'rehype-highlight' // 代码高亮
import rehypeRaw from 'rehype-raw' // 支持 HTML
import rehypeKatex from 'rehype-katex' // 支持数学公式
import 'highlight.js/styles/github-dark.min.css'
import 'katex/dist/katex.min.css' // 数学公式样式
import CopyToClipboardButton from '@/components/CopyToClipboardButton'

const MarkdownRenderer = (props: { markdown: string }) => {
  const { markdown } = props
  let count = -1
  let refs = useRef([])
  return (
    <Box className='markdown-body' sx={{background: 'transparent'}}>
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm, // 支持表格、任务列表等
        ]}
        rehypePlugins={[
          rehypeRaw, // 支持 HTML
          rehypeHighlight, // 代码高亮
          rehypeKatex, // 支持数学公式
        ]}
        components={{
          // 自定义渲染组件（可选）
          a: ({ node, ...props }) => <a style={{ color: 'blue' }} {...props} />, // 自定义链接样式
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            if (match) {
              count++
              refs.current[count] = refs.current[count] ?? React.createRef()
            }
            return match ? (
              <Box className="code-block">
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0 10px',
                  background: '#505059',
                  borderRadius: '5px 5px 0 0',
                  position: 'sticky',
                  top: '0'
                }}>
                  <Box className="code-block-language">{match[1]}</Box>
                  <CopyToClipboardButton textToCopy={refs.current[count]}/>
                </Box>
                <pre ref={refs.current[count]}>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </Box>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  )
}

export default MarkdownRenderer