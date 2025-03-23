import { Box, FormControl, Select, MenuItem, OutlinedInput, Divider } from "@mui/material"
import { useRecoilState } from 'recoil'
import { systemConfigAtom } from '@/store/config'
type Theme = 'light' | 'dark' | 'system'
const GeneralConfig = () => {
  const [systemConfig, setSystemConfig] = useRecoilState(systemConfigAtom)
  const handleChange = (e: React.SyntheticEvent) => {
    setSystemConfig({
      ...systemConfig,
      theme: e.target.value
    })
  }
  return (
    <Box>
      <Box className='flex'>
        <Box>主题</Box>
        <FormControl sx={{width: '200px'}} variant='outlined' margin="normal">
          <Select
            value={systemConfig.theme}
            label="Age"
            displayEmpty
            onChange={handleChange}
            input={<OutlinedInput />}
          >
            <MenuItem value={'light'}>浅色</MenuItem>
            <MenuItem value={'dark'}>深色</MenuItem>
            <MenuItem value={'system'}>跟随系统</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider />
    </Box>
  )
}

export default GeneralConfig