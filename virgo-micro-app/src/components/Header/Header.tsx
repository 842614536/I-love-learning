import React from 'react'
import './style.scss'
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'

// todo 主题颜色改为 #1a73e8
const Header: React.FC = () => {

  const goGithub = () => {
    window.open('https://github.com/842614536/I-love-learning/tree/master')
  }

  const goIssues = () => {
    window.open('https://github.com/842614536/I-love-learning/issues')
  }
  const dispatch = useDispatch()
  const search = () => {
    dispatch({
      type: 'TOGGLESHOWGLOBALDIALOG',
      payload: true
    })
  }
  return (
    <div className='cloud-header'>
      <div className='cloud-header-item left'>
        <div>我是logo</div>
        <div className='global-search-container' onClick={search}>
          <Button type="primary" shape="circle" icon={<SearchOutlined />} />
          <em className='search-text'>search</em>
          <span className='search-keys'>
            <em>⌘ </em>
            <em>K</em>
          </span>
        </div>
      </div>
      <div className='cloud-header-item right'>
        <Button onClick={goGithub} size='large'>看下源码</Button>
        <Button onClick={goIssues} type="primary" size='large'>报个bug</Button>
      </div>
    </div>
  )
}

export default Header