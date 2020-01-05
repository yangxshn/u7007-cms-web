# 这是一个简单的项目

## 前端基于 Vue2.0 开发
### Mint-UI + MUI

## 后端基于 SpringBoot2.0 开发
### MySql + SpringBoot2.0

## [常见的开源协议及其联系和区别？](https://www.cnblogs.com/datieli/p/10381703.html) 

## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的 Header 组件
2. 完成 Tabbar 区域，使用的是 MUI 的 Tabbar
    + 在制作 购物车 小图标的时候，需要导入 icons-extra.css 、 mui-icons-extra.ttf
3. 在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 Tabbar 为 router-link

## 设置路由高亮

## 点击 Tabbar，展示对应的路由组件

## 完成首页轮播图布局

## 加载首页轮播图数据
1. 使用 vue-resource 获取数据 cnpm i vue-resource -S
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染每个 item 项


## 改造 九宫格 区域的样式

## 添加切换动画

## 改造 新闻资讯 路由链接

## 新闻资讯 页面 制作
1. 绘制页面，使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link，同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在 路由模块中，将 新闻详情的 路由地址 和 组件页面 对应起来

## 实现新闻详情的 页面布局 和 数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动导入 comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入的 comment 组件，注册为自己的子组件
4. 将注册子组件时候的 注册名称 ，以标签形式在页面中引用即可

## 获取所有的页面数据，显示到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让 pageIndex++ ，然后重新调用 this.getCommentList() 方法重新获取最新一页的数据
3. 拼接数据 concat

