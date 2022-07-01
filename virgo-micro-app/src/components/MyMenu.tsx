import React, { FC, ReactElement, useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import { Menu } from 'antd'
import myRouters from '@/router.config'
import {IRouter} from '@/typing'

const { SubMenu } = Menu;

const MyMenu: FC = (): ReactElement => {
  const [menuTreeNode, setMenuTreeNode] = useState<Array<ReactElement>>([])

  const history = useHistory()
  const handleClick = (e: any) => {
    history.push(e.key)
    console.log('click ', e);
  };

  useEffect(() :void => {
    setMenuTreeNode(renderMenu(myRouters))
  }, [])

  const renderMenu = (data: IRouter): Array<ReactElement> => {
    return data.map((v, i) => {
      if (v.children) { 
        return (
          <SubMenu key={v.name} title={v.title}>
            {renderMenu(v.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={v.link}>{v.title}</Menu.Item>
        )
      }
    })
  }

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      mode="inline"
      key="root"
    >
      {menuTreeNode.length ? menuTreeNode : null}
    </Menu>
  );
}

export default MyMenu
