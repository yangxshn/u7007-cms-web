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

// 按需导入 Mint-UI 的组件
import 'mint-ui/lib/style.css'
import { Header, Swipe, SwipeItem,Button } from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

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