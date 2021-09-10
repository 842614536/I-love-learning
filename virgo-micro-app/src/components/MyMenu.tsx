import React, { FC, ReactElement, useEffect, useState } from 'react'
import { Menu } from 'antd'
import myRouters from '@/router.config'
import {IRouter} from '@/typing'

const { SubMenu } = Menu;

const MyMenu: FC = (): ReactElement => {
  const [menuTreeNode, setMenuTreeNode] = useState<Array<ReactElement>>([])

  // todo  重新定义any
  const handleClick = (e: any) => {
    console.log('click ', e);
  };

  useEffect(() => {
    console.log(renderMenu(myRouters))
    setMenuTreeNode(renderMenu(myRouters))
    return () => {}
  }, [])

  const renderMenu = (data: IRouter): Array<ReactElement> => {
    return data.map(v => {
      if (v.children) {
        return (
          <SubMenu key={v.name} icon={v.icon} title={v.title}>
            {renderMenu(v.children)}
          </SubMenu>
        )
      } else {
        return <Menu.Item key={v.name}>{v.title}</Menu.Item>
      }
    })
  }

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      {menuTreeNode}
    </Menu>
  );
}

export default MyMenu
