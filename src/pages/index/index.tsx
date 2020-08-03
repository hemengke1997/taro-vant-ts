import React, { FC } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classnames from 'classnames'
import styles from './index.module.less'
import './index.less'
import { getUser } from '@/api'

const Index: FC = () => {
  // const _getUser = () => {
  //   getUser().then(res => {
  //     console.log(res, 'res');
  //   })
  // }

  // const getSystemInfo = () => {
  //   Taro.getSystemInfo({
  //     success: res => {
  //       console.log(res, 'res');
  //     }
  //   })
  // }
  // _getUser()
  // getSystemInfo()

  const gotoLogin = (e: Event) => {
    console.log(e);
    console.log('跳转');
    Taro.navigateTo({
      url: 'login'
    })
  }
  const test = () => {
    console.log('test');
  }
  return (
    <View className='index'>
      <Text className='test' onClick={test}>this is index</Text>
      <van-button type="primary" onClick={gotoLogin}>vant的按钮</van-button>
    </View>
  )
}

export default Index
