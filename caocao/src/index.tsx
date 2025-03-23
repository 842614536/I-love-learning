import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import App from './App'
import './styles'

window.addEventListener('load', () => {
  const rootEl = document.getElementById('ai_root');
  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    )
  }
})
