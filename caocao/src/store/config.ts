import { atom } from 'recoil'

export const systemConfigAtom = atom<SystemConfig>({
  key: 'GETSYSTEMCONFIG',
  default: {
    drawerWidth: 240,
    drawerOpen: true,
    chatWrapHeight: '140px',
    contentHeaderHeight: '60px',
    contentHeight: 'calc(100vh - 200px)',
    theme: 'system'
  }
})

