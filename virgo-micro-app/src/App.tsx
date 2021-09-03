import React, { FC, ReactElement } from 'react';
import {Router, BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import myRouters from './router.config'
import { Layout } from 'antd'
import {
  SiderProps
} from 'antd/lib/layout'
import MyMenu from './components/MyMenu'

const { Header, Sider, Content } = Layout
 
const ClientContainer: FC = (): ReactElement => (
  <div id="client"></div>
)

const SiderConfig: SiderProps = {
  theme: 'light',
  width: '256px'
}

function App() {
  return (
    <div className="App">
       <Layout>
        <Header theme="light">Header</Header>
        <Layout>
          <Sider {...SiderConfig }>
            <MyMenu />
          </Sider>
          <Content>
            <BrowserRouter>
              <Route path="/client" component={ClientContainer}/>
            </BrowserRouter>
          </Content>
        </Layout>
      </Layout>  
    </div>
  );
}

export default App;
