/*
 * @Author: hemengke
 * @Date: 2020-07-31 18:14:40
 * @LastEditTime: 2020-08-03 18:45:37
 * @LastEditors: hemengke
 * @Description: 
 */

const urlList = ['common', 'ade', 'user', 'pay', 'aly', 'knowledgepay', 'account', 'login', 'flowPacket'];
let proxy = ''







const getBaseUrl = (url) => {
  let BASE_URL = '';
  if (process.env.NODE_ENV === 'development') {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    if (url.startsWith('http')) {
      BASE_URL = url
    } else {
      BASE_URL = proxy + url
    }
  } else {
    // 生产环境
    console.log('请求为正式环境');
  }
  return BASE_URL
}

export default getBaseUrl;