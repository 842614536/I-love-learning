import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const temp: any = window;
const isQianKun = temp.___POWERED_BY_QIANKUN_;

const render = () => {
  createApp(App)
    .use(store)
    .use(router)
    .mount(isQianKun ? "#operate" : "#operate_app");
};

export async function mount(props: any): Promise<void> {
  console.log(props);
  render();
}

export async function unmount(props: any): Promise<void> {
  console.log(props);
}

isQianKun || render();
