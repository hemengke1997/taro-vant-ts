/*
 * @Author: hemengke
 * @Date: 2020-07-31 16:17:03
 * @LastEditTime: 2020-07-31 23:02:06
 * @LastEditors: hemengke
 * @Description: redux-store
 */

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './rootReducer'

const composeEnhancer =
  typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const middlewares = [thunkMiddleware, createLogger()]

const enhancer = composeEnhancer(applyMiddleware(...middlewares))

export default function configStore() {
  const store = createStore(rootReducer, enhancer)
  return store
}