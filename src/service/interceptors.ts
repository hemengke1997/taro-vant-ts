/*
 * @Author: hemengke
 * @Date: 2020-07-31 18:48:37
 * @LastEditTime: 2020-08-01 11:26:20
 * @LastEditors: hemengke
 * @Description: request拦截器配置
 */


import Taro from '@tarojs/taro'
import { HTTP_STATUS } from './config'
import setXYZ from './setXYZ'
import { setCookie } from './setCookies'

const userInterceptor = (chain) => {

  const requestParams = chain.requestParams
  const { method, data, url } = requestParams

  // 请求前的拦截器设置xyz
  const l_method = method.toLowerCase()
  if (l_method === 'post' || l_method === 'get') {
    requestParams.data = setXYZ(url, data)
  }

  return chain.proceed(requestParams).then(res => {
    // 请求后的拦截器 设置cookies
    setCookie(res)
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      return Promise.reject("请求资源不存在")

    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject("服务端出现了问题")

    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      Taro.setStorageSync("Authorization", "")
      // TODO 根据自身业务修改
      return Promise.reject("没有权限访问");

    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      Taro.setStorageSync("Authorization", "")
      return Promise.reject("需要鉴权")

    } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
      return res.data
    }
  })
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [userInterceptor, Taro.interceptors.logInterceptor]

export default interceptors