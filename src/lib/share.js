const HEAD_IMG = 'http://xcyzj.ngchuanmei.com/static/img/header-bg.jpg'

export function share (title, desc, successcb, failcb) {
  window.wx && window.wx.onMenuShareTimeline({
    title,
    desc,
    link: location.href, // 分享链接
    imgUrl: HEAD_IMG, // 分享图标
    success: () => {
      successcb && typeof successcb === 'function' && successcb()
    },
    cancel: () => {
      failcb && typeof failcb === 'function' && failcb()
    }
  })
  window.wx && window.wx.onMenuShareAppMessage({
    title,
    desc,
    link: location.href, // 分享链接
    imgUrl: HEAD_IMG, // 分享图标
    success: () => {
      successcb && typeof successcb === 'function' && successcb()
    },
    cancel: () => {
      failcb && typeof failcb === 'function' && failcb()
    }
  })
}
