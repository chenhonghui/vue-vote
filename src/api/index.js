import axios from 'axios'
import apis from './apis'
import qs from 'qs'
import storage from '../lib/localstorage'

function postWithoutSession (api, data) {
  return new Promise((resolve, reject) => {
    axios.post(api, qs.stringify(data)).then(res => {
      if (res.data.code === '-1') {
        reject(res.data.msg)
      }
      resolve(res.data.data)
    }, reject)
  })
}

function postWithSession (api, data) {
  const openId = storage.get('openId') || ''

  return new Promise((resolve, reject) => {
    axios.post(api, qs.stringify(Object.assign({}, data, { wxId: openId }))).then(res => {
      if (res.data.code === '-1') {
        reject(res.data.msg)
      }
      resolve(res.data.data)
    }, reject)
  })
}

function get (api) {
  return axios({
    method: 'GET',
    api
  })
}

export default {
  // 授权相关
  getWxSigntrue (url) {
    return postWithoutSession(apis.getWxsigntrue, {
      rUrl: url
    })
  },
  getWxUserInfo (token, openId) {
    return get(`https://api.weixin.qq.com/sns/userinfo?access_token=${token}&${openId}&lang=zh_CN`)
  },
  wxOpenId (code) {
    return postWithoutSession(apis.wxopenid, {
      code
    })
  },
  // 投票相关
  enroll (form) {
    return postWithSession(apis.enroll, form)
  },
  vote (id) {
    return postWithSession(apis.vote, { contentId: id })
  },
  // 首页相关
  indexUpdate () {
    return postWithoutSession(apis.indexUpdate, {})
  },
  getVoteList (page) {
    return postWithSession(apis.getVoteList, { index: page })
  },
  searchVoteList (condition) {
    return postWithSession(apis.searchVoteList, { condition })
  },
  indexInfo () {
    return postWithSession(apis.indexInfo, {})
  },
  getDetail (contentId) {
    return postWithSession(apis.getDetail, {
      contentId
    })
  },
  // 投票总榜
  rank () {
    return postWithoutSession(apis.rank, {})
  }
}
