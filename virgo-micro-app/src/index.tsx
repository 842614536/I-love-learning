import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/reset.less'
import './assets/style/index.less'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {registerMicroApps, start} from 'qiankun'
import { BrowserRouter as Router } from 'react-router-dom'
// declare global {
//   interface Window {
//     __REACT_ERROR_OVERLAY_GLOBAL_HOOK__: object;
//   }
// }

// window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__ = {}
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root-virgo-micro-app')
);

registerMicroApps(
  [
    {
      name: 'client',
      entry: 'http://lpf.com:3001',
      container: '#client',
      activeRule: '/client'
    },
    {
      name: "operate",
      entry: "http://lpf.com:3002",
      container: "#operate",
      activeRule: "/operate",
      props: {}
    }
  ]
)

start()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
