// 入口文件
import Vue from 'vue'

// 导入 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://127.0.0.1:9200';
// 全局设置 post 时候表单数据的组织形式
Vue.http.options.emulateJSON = true;

// 按需导入 Mint-UI 的组件
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
Vue.use(MintUI)

/*import { Header, Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);*/

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: { top: 0, bottom: 0 },
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
})

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})