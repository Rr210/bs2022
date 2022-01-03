/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 18:14:16
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-01-03 21:12:20
 * @LastEditors: Harry
 */
import { Sidebar, Swipe, SwipeItem, TreeSelect, Image, Skeleton, Uploader, SidebarItem, Tabbar, TabbarItem, NavBar } from 'vant'
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
  app.use(Swipe)
  app.use(SwipeItem)
}

export default vant
