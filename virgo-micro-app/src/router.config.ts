import {
  IRouter
} from '@/typing'
import { MailOutlined } from '@ant-design/icons'

const OPERATE_BASIC_URL = '/config'
const CLIENT_BASIC_URL = '/client'

const routers: IRouter = [
  {
    title: '配置管理',
    icon: MailOutlined,
    name: OPERATE_BASIC_URL,
    children: [
      {
        link: `${OPERATE_BASIC_URL}/reading-list`,
        title: '阅读清单',
        name: `${OPERATE_BASIC_URL}/reading-list`,
      },
      {
        link: `${OPERATE_BASIC_URL}/qa`,
        title: 'QA',
        name: `${OPERATE_BASIC_URL}/qa`,
      }
    ]
  },
  {
    title: '学习任务',
    name: CLIENT_BASIC_URL,
    children: [
      {
        link: `${CLIENT_BASIC_URL}/reading-list`,
        title: '阅读清单',
        name: `${CLIENT_BASIC_URL}/reading-list`,
      },
      {
        link: `${CLIENT_BASIC_URL}/qa`,
        title: 'QA',
        name: `${CLIENT_BASIC_URL}/qa`,
      },
      {
        link: `${CLIENT_BASIC_URL}/test`,
        title: '答题测试',
        name: `${CLIENT_BASIC_URL}/test`,
      }
    ]
  }
]

export default routers