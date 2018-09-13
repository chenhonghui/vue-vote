import UrlParse from 'url-parse'

export function jump (url, router) {
  const parsedUrl = new UrlParse(url, true)
  const query = parsedUrl.query
  const path = parsedUrl.pathname

  if (!router) {
    throw new Error('请传入页面的router对象以用于跳转')
  }

  router && router.push({
    path,
    query
  })
}
