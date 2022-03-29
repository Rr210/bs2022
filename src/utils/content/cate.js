/*
 * @Author: Harry
 * @Date: 2022-01-02 10:17:18
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-29 15:26:03
 * @FilePath: \vant-u\src\utils\content\cate.js
 */
const PEST_LIST_CATE = [
  {
    pid: 0,
    text: '全部',
    path: 'all',
    value: 'all'
  },
  {
    pid: 1,
    text: '草本害虫',
    path: '草本害虫',
    value: '草本害虫'
  },
  {
    pid: 2,
    text: '木本害虫',
    path: '木本害虫',
    value: '木本害虫'
  },
  {
    pid: 3,
    text: '根部害虫',
    path: '根部害虫',
    value: '根部害虫'
  }
]

const DETAIL_PEST = [
  {
    pid: 0,
    text: '危害特点',
    path: '危害特点',
    value: 'harm_feat'
  },
  {
    pid: 1,
    text: '危害寄主',
    path: '危害寄主',
    value: 'harm_host'
  },
  {
    pid: 2,
    text: '防治措施',
    path: '防治措施',
    value: 'control_measures'
  }
]
export {
  PEST_LIST_CATE, DETAIL_PEST
}
