/*
 * @Author: hemengke
 * @Date: 2020-07-31 19:22:04
 * @LastEditTime: 2020-08-01 10:35:08
 * @LastEditors: hemengke
 * @Description: 所有的api
 */ 

import request from '../service/service'


const rootUrl = '/xdnphb/'

export const getUser = () => {
  const url = rootUrl + 'common/account/get'
  return request.get(url)
}

