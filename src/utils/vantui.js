/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 18:14:16
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-29 14:39:30
 * @LastEditors: Harry
 */
import { Sidebar, TreeSelect, Image, Skeleton, Uploader, SidebarItem, Tabbar, TabbarItem, NavBar } from 'vant'
const vant = function (app) {
  app.use(Sidebar)
  app.use(SidebarItem)
  app.use(Tabbar)
  app.use(TabbarItem)
  app.use(NavBar)
  app.use(Uploader)
  app.use(Skeleton)
  app.use(TreeSelect)
  app.use(Image)
}

export default vant
