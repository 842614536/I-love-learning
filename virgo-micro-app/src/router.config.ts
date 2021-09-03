interface IRouterItem {
  link: string;
  remark?: string;
  children?: Array<IRouterItem>
}

type IRouter = Array<IRouterItem>

const routers: IRouter = [
  {
    link: '/',
    children: [
      {
        link: '/',
      }
    ]
  }
]

export default routers