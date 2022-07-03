import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/style/index.less'

// todo 提取合并
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__: boolean;
  }
}
const isQianKun = window.__POWERED_BY_QIANKUN__
const render = () => {
  createApp(App)
    .use(store)
    .use(Antd)
    .use(router)
    .mount(isQianKun ? "#operate_app" : "#operate_app");
};

export async function bootstrap(): Promise<void> {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props: any): Promise<void> {
  console.log(props);
  render();
}

export async function unmount(props: any): Promise<void> {
  console.log(props);
}

isQianKun || render();
