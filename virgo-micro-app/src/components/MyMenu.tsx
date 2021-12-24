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
    return data.map(v => {
      console.log(v.icon)
      if (v.children) { 
        return (
          <SubMenu key={v.name} title={v.title}>
            {renderMenu(v.children)}
          </SubMenu>
        )
      } else {
        return (
          <div key={v.name}>
            <Link to={v.link}>
              <Menu.Item>{v.title}</Menu.Item>
            </Link>
          </div>
        )
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
      {menuTreeNode.length ? menuTreeNode : null}
    </Menu>
  );
}

export default MyMenu
