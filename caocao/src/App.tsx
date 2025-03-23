import { Box } from '@mui/material'
import Main from './components/Main'
import MenuList from './components/MenuList'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { systemConfigAtom } from './store/config'

// 亮色主题
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // 蓝色
    },
    background: {
      default: '#ffffff', // 白色背景
      paper: '#f5f5f5',   // 浅灰色纸张背景
    },
  },
})

// 暗色主题
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // 浅蓝色
    },
    background: {
      default: '#121212', // 深色背景
      paper: '#1e1e1e',   // 深灰色纸张背景
    },
  },
})
function App() {
  const [currentTheme, setCurrentTheme] = useState(darkTheme)
  const systemConfig = useRecoilValue(systemConfigAtom)
  useEffect(() => {
    if (systemConfig.theme === 'dark') {
      setCurrentTheme(darkTheme)
    } else if (systemConfig.theme === 'light') {
      setCurrentTheme(lightTheme)
    } else if (systemConfig.theme === 'system') {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleThemeChange = (event: any) => {
        if (event.matches) {
          setCurrentTheme(darkTheme)
        } else {
          setCurrentTheme(lightTheme)
        }
      }

      // 监听变化
      darkModeQuery.addEventListener('change', handleThemeChange)
    }
  })
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
        <MenuList />
        <Main />
      </Box>
    </ThemeProvider>
  )
}

export default App