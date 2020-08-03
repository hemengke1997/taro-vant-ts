/*
 * @Author: hemengke
 * @Date: 2020-07-31 17:20:56
 * @LastEditTime: 2020-07-31 21:31:11
 * @LastEditors: hemengke
 * @Description: 封装taro请求
 */

import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'

import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))


type OptionType = {
  url: string,
  data?: object | string | number,
  method?: any,
  header: object,
  success?: any,
  error?: any,
  xhrFields: object,

}



export default {
  baseRequest(params, method = "GET") {
    let { url, data } = params
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option: OptionType = {
      url: url.startsWith('http') ? url : getBaseUrl(url),
      data,
      method,
      header: {
        'content-type': contentType,
        cookie: Taro.getStorageSync('cookies')
      },
      xhrFields: { withCredentials: true },
    }
    return Taro.request(option)
  },

  get(url, data = '') {
    let option = { url, data }
    return this.baseRequest(option)
  },

  post(url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseRequest(params, "POST")
  },

  put(url, data = '') {
    let option = { url, data }
    return this.baseRequest(option, 'PUT')
  },

  delete(url, data = '') {
    let option = { url, data }
    return this.baseRequest(option, 'DELETE')
  }
}