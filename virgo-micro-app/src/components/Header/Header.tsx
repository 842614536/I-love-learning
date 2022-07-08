import React from 'react'
import './style.scss'
import {
  Button
} from 'antd'

// todo 主题颜色改为 #1a73e8
const Header: React.FC = () => {
  return (
    <div className='cloud-header'>
      <Button type="primary" size='large'>
        Primary
      </Button>
    </div>
  )
}

export default Header