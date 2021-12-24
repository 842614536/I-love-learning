import React, { FC, ReactElement } from "react";
import { Router, BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import { SiderProps } from "antd/lib/layout";
import MyMenu from "./components/MyMenu";

const { Header, Sider, Content } = Layout;

const ClientContainer: FC = (): ReactElement => <div id="client"></div>
const OperateContainer: FC = (): ReactElement => <div id="operate"></div>

const SiderConfig: SiderProps = {
  theme: "light",
  width: "256px",
};

function App() {
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
