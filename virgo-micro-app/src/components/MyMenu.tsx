import React, { FC, ReactElement, useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
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
    setMenuTreeNode(renderMenu(myRouters))
    return () => {}
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
          <Link key={i} to={v.link}>
            <Menu.Item key={v.name}>{v.title}</Menu.Item>
          </Link>
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
