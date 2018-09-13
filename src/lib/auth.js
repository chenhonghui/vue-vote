import api from '../api/index'
import config from '../config/config'
import UrlParse from 'url-parse'
import storage from '../lib/localstorage'

function getUrlParam (param) {
  const newUrl = new UrlParse(location.href, true)

  const query = newUrl.query

  return query[param] || ''
}

export default {
  getSigntrue () {
    const nowUrl = location.href.split('#')[0]
    return api.getWxSigntrue(nowUrl)
  },
  oauth () {
    return new Promise((resolve) => {
      const openId = storage.get('openId') || ''
      var appId = config.appID

      var url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(location.href.split('#')[0])}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
      var code = getUrlParam('code')
      if (!code && !openId) {
        window.location = url
      } else if (code && !openId) {
        api.wxOpenId(code).then(res => {
          storage.set('openId', res.openid)
          window.location = `${location.href.split('?')[0]}/`
          resolve(res.openid)
        })
      } else {}
    })
  },
  login () {
    this.getSigntrue().then(res => {
      window.wx && window.wx.config({
        appId: 'wx0de73ddd52c76f3d',
        debug: config.currentEnv === 'rd',
        timestamp: res.timestamp,
        nonceStr: res.noncestr,
        signature: res.signature,
        jsApiList: config.wxJsApiList
      })
    })

    return new Promise((resolve, reject) => {
      window.wx && window.wx.ready(() => {
        resolve()
      })

      window.wx && window.wx.error((err) => {
        reject(err)
      })
    })
  }
}
