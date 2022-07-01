import React, { FC, ReactElement } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import { SiderProps } from "antd/lib/layout";
import MyMenu from "./components/MyMenu";
import io from 'socket.io-client'
const { Header, Sider, Content } = Layout;

const ClientContainer: FC = (): ReactElement => <div id="client"></div>
const OperateContainer: FC = (): ReactElement => <div id="operate"></div>

const SiderConfig: SiderProps = {
  theme: "light",
  width: "256px",
};

function App() {
  // const socket = io('http://localhost:8042', {'transports': ['websocket']})
  // console.log('-------')
  // socket.on('connect', () => {
  //   socket.send('什么鬼')
  //   socket.emit('getNewData', '我佛了')
  //   socket.on('message', (data: any) => {
  //     console.log(data)
  //   })
  //   socket.close();
    
  // })

  

  // console.log(socket)
  // console.log(socket.emit)
  // socket.emit('getNewData', '我佛了')
  // socket.subscribe('getNewData', '我佛了')
  // socket.on('message', (data: any) => {
  //   console.log(data)
  // })
  return (
    <div className="App">
      <Layout>
        <Header>Header</Header>
        <Layout>
          <BrowserRouter>
            <Sider {...SiderConfig}>
              <MyMenu />
            </Sider>
            <Content>
              <Route path="/client" component={ClientContainer} />
              <Route path="/operate" component={OperateContainer} />
            </Content>
          </BrowserRouter>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
