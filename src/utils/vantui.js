/*
 * @Description:
 * @Author: Harry
 * @Date: 2021-12-26 18:14:16
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-05-11 18:53:05
 * @LastEditors: harry
 */
import {
  Sidebar, Popup, SwipeCell, List, Search, Circle, DropdownMenu, DropdownItem, Divider, PullRefresh, Overlay, Icon, Pagination, Button, Collapse, CollapseItem, Tag, NoticeBar, Swipe, Popover, Tabs, Tab, SwipeItem, Image, Skeleton, Uploader, SidebarItem, Tabbar, TabbarItem, NavBar
} from 'vant'
const vant = function (app) {
  app.use(Sidebar)
  app.use(SidebarItem)
  app.use(Search)
  app.use(Tabbar)
  app.use(TabbarItem)
  app.use(NavBar)
  app.use(SwipeCell)
  app.use(List)
  app.use(Circle)
  app.use(DropdownMenu)
  app.use(DropdownItem)
  app.use(Uploader)
  app.use(Skeleton)
  app.use(Collapse)
  app.use(CollapseItem)
  app.use(Image)
  app.use(Swipe)
  app.use(Icon)
  app.use(Tag)
  app.use(Divider)
  app.use(Tabs)
  app.use(Overlay)
  app.use(Pagination)
  app.use(Tab)
  app.use(Popup)
  app.use(NoticeBar)
  app.use(PullRefresh)
  app.use(Button)
  app.use(Popover)
  app.use(SwipeItem)
}

export default vant
