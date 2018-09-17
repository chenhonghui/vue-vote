const currentEnv = process.env.NODE_ENV === 'development' ? 'rd' : 'prod'
const origins = {
  rd: 'http://jirjzx.natappfree.cc/tpxt',
  prod: 'http://xcyzj.ngchuanmei.com/tpxt'
}
const appids = {
  rd: 'wx0de73ddd52c76f3d',
  prod: 'wxcbde9a8ee067fc88'
}

export default {
  appID: appids[currentEnv],
  currentEnv,
  origins,
  api: origins[currentEnv],
  wxJsApiList: [
    'onMenuShareTimeline',
    'onMenuShareAppMessage'
  ]
}
