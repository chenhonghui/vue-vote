const exportPage = () => import(/* webpackChunkName: "exportPage" */ '@/pages/export')
const auditing = () => import(/* webpackChunkName: "auditing" */ '@/pages/auditing')

export default [
  {
    path: '/',
    name: 'Export',
    component: exportPage
  },
  {
    path: '/auditing',
    name: 'Auditing',
    component: auditing
  }
]
