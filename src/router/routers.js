const pure = () => import(/* webpackChunkName: "pure" */ '@/pages/pure')

export default [
  {
    path: '/',
    name: 'Pure',
    component: pure
  }
]
