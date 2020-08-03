/*
 * @Author: hemengke
 * @Date: 2020-07-31 18:51:03
 * @LastEditTime: 2020-07-31 22:22:27
 * @LastEditors: hemengke
 * @Description: 给请求加密
 */

import md5 from 'blueimp-md5';
import sampleSize from 'lodash/sampleSize';

const arr = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
];

/**
 * 添加xyz参数
 * @param {string} url 请求地址
 * @param {object} data 请求数据
 */
export default function setXYZ(url: string, data = {}) {
  let code = `${url}?AppKey=joker`;
  let param = {};
  for (let key of Object.keys(data).sort()) {
    let value = data[key] === null ? '' : data[key];
    param[key] = value;
    code += `&${key}=${value}`;
  }

  // 随机取数大小为9的数组转为字符串
  const nonce = sampleSize(arr, 9).join('');
  code += `&nonce=${nonce}`;
  param["nonce"] = nonce;
  param["xyz"] = md5(code);
  return param;
}
