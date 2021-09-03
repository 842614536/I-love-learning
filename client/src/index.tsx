import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

declare interface MyWindow extends Window{
  __POWERED_BY_QIANKUN_?: boolean;
}

let myWindow:MyWindow = window

const initAPP = (container?: HTMLElement) => {
  return ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container ? container.querySelector('#root') : document.querySelector('#root')
  )
}

//全局变量来判断环境，独立运行时
if(!myWindow.__POWERED_BY_QIANKUN_) {
  initAPP()
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap () {
  await console.log('client app bootstraped');
}

export async function mount (props: any) {
  const {container} = props
  initAPP(container)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount () {
  await ReactDOM.unmountComponentAtNode(
    document.getElementById('client') || document.createDocumentFragment()
  )
}

export async function updated (props: any) {
  await console.log('update props', props)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
