const vote = () => import(/* webpackChunkName: "vote" */ '@/pages/vote')
const join = () => import(/* webpackChunkName: "join" */ '@/pages/join')
const rank = () => import(/* webpackChunkName: "rank" */ '@/pages/rank')
const detail = () => import(/* webpackChunkName: "detail" */ '@/pages/detail')
const prizes = () => import(/* webpackChunkName: "prizes" */'@/pages/prizes')
const pollDetail = () => import(/* webpackChunkName: "pollDetail" */'@/pages/pollDetail')

export default [
  {
    path: '/',
    name: 'Home',
    component: vote
  },
  {
    path: '/vote',
    name: 'Vote',
    component: vote
  },
  {
    path: '/join',
    name: 'Join',
    component: join
  },
  {
    path: '/rank',
    name: 'Rank',
    component: rank
  },
  {
    path: '/detail',
    name: 'Detail',
    component: detail
  },
  {
    path: '/prizes',
    name: 'Prizes',
    component: prizes
  },
  {
    path: '/pollDetail',
    name: 'PollDetail',
    component: pollDetail
  }
]
