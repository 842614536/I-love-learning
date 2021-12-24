import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {registerMicroApps, start} from 'qiankun'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root-virgo-micro-app')
);

registerMicroApps(
  [
    {
      name: 'client',
      entry: 'http://localhost:3001',
      container: '#client',
      activeRule: '/client'
    },
    {
      name: "operate",
      entry: "http://localhost:3002",
      container: "#operate",
      activeRule: "/operate",
    }
  ]
)

start()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
