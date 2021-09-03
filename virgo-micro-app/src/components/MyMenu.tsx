import React, { FC, ReactElement } from 'react'
import { Menu } from 'antd'
import { MailOutlined } from '@ant-design/icons'

const { SubMenu } = Menu;

const MyMenu: FC = (): ReactElement => {

  // todo  重新定义any
  const handleClick = (e: any) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
        <Menu.ItemGroup key="g1" title="Item 1">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Item 2">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default MyMenu
