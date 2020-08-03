/*
 * @Author: hemengke
 * @Date: 2020-07-31 16:49:54
 * @LastEditTime: 2020-07-31 23:08:48
 * @LastEditors: hemengke
 * @Description: 
 */
import { HOME } from './action-type'

//  设置home
export const setHome = (payload) => {
  const { name } = payload
  return dispatch => {
    dispatch({
      type: HOME,
      payload: {
        name: name
      }
    })
  }
}