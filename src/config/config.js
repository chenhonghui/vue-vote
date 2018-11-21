const currentEnv = process.env.NODE_ENV === 'development' ? 'rd' : 'prod'
const origins = {
  rd: 'http://68i64h.natappfree.cc/tpxt',
  prod: 'http://xcyzj.gotoip4.com/tpxt'
}
const appids = {
  rd: 'wx0de73ddd52c76f3d',
  prod: 'wxa48883fdfd393764'
}

export default {
  appID: appids[currentEnv],
  currentEnv,
  origins,
  api: origins[currentEnv],
  wxJsApiList: [
    'onMenuShareTimeline'
  ]
}
