/*
 * @Author: Harry
 * @Date: 2022-03-29 12:41:04
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-29 12:47:57
 * @FilePath: \vant-u\src\utils\tool\html2cancas-c.js
 */
// 截图保存 仅支持pc端 和 普通浏览器 微信内置不兼容
import html2canvas from 'html2canvas'
import { Toast } from 'vant'
export const doCut = function (shareDom, state) {
  console.log(shareDom.offsetHeight)
  html2canvas(shareDom, {
    dpi: window.devicePixelRatio * 2,
    scale: 1,
    allowTaint: true,
    useCORS: true,
    height: shareDom.offsetHeight,
    width: shareDom.offsetWidth,
    scrollY: 0,
    scrollX: 0
  }).then((canvas) => {
    const img = new Image()
    img.src = canvas.toDataURL('png')
    img.setAttribute('crossOrigin', 'anonymous')
    img.onload = function () {
      const imgUrl = canvas.toDataURL('image/png')
      // console.log(imgUrl)
      state.imageUrl = imgUrl
      Toast('海报已生成，长按后分享给好友')
      // saveFile(imgUrl, 'test.png')
      // 根据生成的图片地址imgUrl（base64）进行后续保存操作
    }
  })
}
// 保存图片
// const saveFile = function (data, filename) {
//   const saveLink = document.createElementNS(
//     'http://www.w3.org/1999/xhtml',
//     'a'
//   )
//   saveLink.href = data
//   saveLink.download = filename
//   var event = document.createEvent('MouseEvents')
//   event.initMouseEvent(
//     'click',
//     true,
//     false,
//     window,
//     0,
//     0,
//     0,
//     0,
//     0,
//     false,
//     false,
//     false,
//     false,
//     0,
//     null
//   )
//   saveLink.dispatchEvent(event)
// }
