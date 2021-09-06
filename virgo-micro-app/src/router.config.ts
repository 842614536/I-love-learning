interface IRouterItem {
  link?: string;
  title: string;
  remark?: string;
  children?: Array<IRouterItem>
}

type IRouter = Array<IRouterItem>

const OPERATE_BASIC_URL = '/operate'
const CLIENT_BASIC_URL = '/client'

const routers: IRouter = [
  {
    title: '配置管理',
    children: [
      {
        link: `${OPERATE_BASIC_URL}/reading-list`,
        title: '阅读清单',
      },
      {
        link: `${OPERATE_BASIC_URL}/qa`,
        title: 'QA',
      }
    ]
  },
  {
    title: '学习任务',
    children: [
      {
        link: `${CLIENT_BASIC_URL}/reading-list`,
        title: '阅读清单',
      },
      {
        link: `${CLIENT_BASIC_URL}/qa`,
        title: 'QA',
      },
      {
        link: `${CLIENT_BASIC_URL}/test`,
        title: '答题测试',
      }
    ]
  }
]

export default routers