/*
 * @Author: hemengke
 * @Date: 2020-07-31 19:07:00
 * @LastEditTime: 2020-07-31 19:10:38
 * @LastEditors: hemengke
 * @Description: 从接口返回的值中取cookie
 */
export const setCookie = (res: {
  cookies: Array<{
    name: string,
    value: string,
    expires: string,
    path: string
  }>,
  header: {
    'Set-Cookie': string
  }
}) => {
  if (res.cookies && res.cookies.length) {
    let cookies = ''
    res.cookies.forEach((cookie, index) => {
      // windows的微信开发者工具返回的是cookie格式是有name和value的,在mac上是只是字符串的
      if (cookie.name && cookie.value) {
        cookies += index === res.cookies.length - 1 ?
          `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}` :
          `${cookie.name}=${cookie.value};`
      } else {
        cookies += `${cookie};`
      }
    })
    Taro.setStorageSync('cookies', cookies)
  }
  if (res.header && res.header['Set-Cookie']) {
    Taro.setStorageSync('cookies', res.header['Set-Cookie'])
  }
}