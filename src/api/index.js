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
  const openId = storage.get('token') || ''

  return new Promise((resolve, reject) => {
    axios.post(api, qs.stringify(Object.assign({}, data, { token: openId }))).then(res => {
      if (res.data.code === '-1') {
        reject(res.data.msg)
      }
      if (res.data.code === '-2') {
        openId && storage.remove('token')
        window.location.href = `${window.location.origin}/${window.location.pathname}`
        reject(res.data.msg)
      }
      resolve(res.data.data)
    }, reject)
  })
}

function getToblob (api) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: api,
      responseType: 'blob'
    }).then(res => {
      resolve(res)
    }, reject)
  })
}

export default {
  // 授权相关
  getWxSigntrue (url) {
    return postWithoutSession(apis.getWxsigntrue, {
      rUrl: url
    })
  },
  wxOpenId (code) {
    return postWithoutSession(apis.wxopenid, {
      code
    })
  },
  // 投票相关
  enroll (form) {
    return postWithoutSession(apis.enroll, form)
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
  },
  // 下载相关
  exportLogin (data) {
    return postWithoutSession(apis.login, data)
  },
  export () {
    return getToblob(apis.export, {})
  },
  // 审核相关
  getUncheckedList (index, checked) {
    return postWithSession(apis.getUncheckedList, {
      index,
      checked
    })
  },
  check (contentId, checked) {
    return postWithSession(apis.check, {
      contentId,
      checked
    })
  },
  del (contentId) {
    return postWithSession(apis.del, {
      contentId
    })
  }
}
