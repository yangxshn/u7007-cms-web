## 服务端代码：https://github.com/yangxshn/u7007-cms-back

## 前端基于 Vue2.0 开发
### Mint-UI + MUI

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

## 获取所有的评论数据，显示到页面中
1. getCommentList

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让 pageIndex++ ，然后重新调用 this.getCommentList() 方法重新获取最新一页的数据
3. 拼接数据 concat

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给服务器
5. 当发表评论成功后，重新刷新列表，以查看最新的评论
 + 如果调用 getCommentList 方法重新刷新评论列表的话，可能只能得到 最后一页的评论，前几页的评论
 获取不倒
 + 换一种思路：当评论成功后，在客户端，手动拼接出一个最新的评论对象，然后调用数组的 unshift 方法，
 把最新的评论，追加到 data 中 commentList 的开头，这样，就能完美实现刷新评论列表的需求

## 改造图片分享 按钮 为路由的链接并显示对应的组件页面

## 绘制 图片分享 组件页面结构并美化样式
1. 绘制 顶部的滑动条
2. 绘制 底部的图片列表
### 绘制顶部滑动条的坑：
1. 需要借助于 MUI 中的 tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下
 + 导入 mui.js
 + 调用官方提供的方式去初始化：
 ```
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
 ```
4. 在初始化 滑动条的时候，导入了 mui.min.js 但是控制台报错 `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
 + 经过合理推测，可能是 mui.min.js 中用到了 'caller', 'callee', and 'arguments' ，但是，webpack 打包好的 bundle.js 中，默认是
   启用严格模式的，所以，这两者冲突了
 + 解决方案：1. 把 mui.min.js 中的 非严格 模式的代码改掉，但是不现实；2. 禁用 webpack 的严格模式 http://npm.taobao.org/package/babel-plugin-transform-remove-strict-mode
5. 刚进入 图片分享页面 的时候，滑动条无法正常工作，经过分析发现，如果要初始化 滑动条 ，必须要等 DOM 元素加载完毕，所以，需要把 初始化
   滑动条 的代码，搬到 mounted 生命周期函数中
6. 当滑动条调试成功后，发现 tabbar 无法正常工作了，这时候，需要把每个 tabbar 按钮的样式中 `mui-tab-item`  重新改一下名称
7. 获取所有分类，并渲染分类列表

### 绘制图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的 组件 `lazy-load`
2. 根据 `lazy-load` 的使用文档，尝试使用
3. 渲染图片列表数据

### 实现 图片列表的懒加载 和 样式美化

### 实现 点击图片跳转到 图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为 哪种元素

### 实现 详情页面的布局和美化，同时获取数据渲染页面


### 实现图片详情中 缩略图 的功能 https://github.com/LS1231/vue-preview
1. 使用 插件 vue-preview 实现 索引图
2. 获取所有的图片列表，并渲染数据
3. 注意：每个 图片数据对象中，必须有 w 和 h 属性

## 绘制 商品列表 页面基本结构并美化

## 尝试在手机上 去进行项目的预览和测试
1. 要保证自己的手机可以正常运行
2. 要保证 手机 和 开发项目的电脑 处于同一个局域网
3. 打开自己项目中 package.json 文件，在 dev 脚本中，添加一个 --host 指令，把当前电脑的
WIFI IP地址，设置为 --host 的指令值
  + 如何查看自己电脑所处 WIFI 的 IP,在 cmd 终端中运行 `ipconfig` ，查看 无线网的 IP 地址




