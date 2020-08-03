/*
 * @Author: hemengke
 * @Date: 2020-07-31 16:49:59
 * @LastEditTime: 2020-07-31 23:12:26
 * @LastEditors: hemengke
 * @Description: 
 */
import { HOME } from './action-type'

const INITIAL_STATE = {
  test: {
    name: ''
  }
}

export default function test(state = INITIAL_STATE, action) {
  switch (action.type) {
    case HOME:
      let a = action.payload
      return {
        ...state,
        a
      }
    default:
      return state
  }
}