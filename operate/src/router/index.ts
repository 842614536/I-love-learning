import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ReadingList from '../views/ReadingList/ReadingList.vue'


// todo 提取合并
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__: boolean;
  }
}
const isQianKun = window.__POWERED_BY_QIANKUN__
const prefix = isQianKun ? '/operate' : ''
// todo 组件改为按需加载 react-loadable
const routes: Array<RouteRecordRaw> = [
  {
    path: `${prefix}/about`,
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: `${prefix}/reading-list`,
    name: "reading-list",
    component: ReadingList,
  },
  {
    path: "/qa",
    name: "qa",
    component: ReadingList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
