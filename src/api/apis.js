import config from '../config/config'

export default {
  // 授权相关
  getWxsigntrue: `${config.api}/wxsignature`,
  wxopenid: `${config.api}/wxopenid`,
  // vote相关
  enroll: `${config.api}/ticket/enroll`,
  vote: `${config.api}/ticket/vote`,
  // 首页相关
  getVoteList: `${config.api}/index/list`,
  searchVoteList: `${config.api}/index/search`,
  indexInfo: `${config.api}/index/otherInfo`,
  getDetail: `${config.api}/index/detail`,
  indexUpdate: `${config.api}/index/updateViewCount`,
  // 投票总表
  rank: `${config.api}/index/rank`
}
