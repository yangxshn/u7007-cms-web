// 入口文件
import Vue from 'vue'

// 导入 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

// 注册 Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站，肯定会调用 main.js，在刚调用的时候，先从本地存储中，把购物车的数据
// 读取出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]');
var store = new Vuex.Store({
    state: { // this.$store.state.***
        car: car // 将 购物车中的商品的数据，用一个数组存储起来，在 car 数组中，
        // 存储一些商品的对象，可以赞数将这个商品对象，设计成这个样子
        // { id:商品的id,count:要购买的数量，price:商品的单价,selected:true }
    },
    mutations: { // this.$store.commit('方法名'，唯一参数)
        addToCar(state, goodsInfo) {
            // 点击加入购物车，把商品信息，保存到 store 中的 car 上
            // 分析：
            // 1. 如果购物车中，之前就已经有这个对应的商品了，那么只需要更新数量
            // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

            // 假设 在购物车中，没有找到对应的商品
            var flag = false;
            state.car.some(item => {
                if (item.goodsId == goodsInfo.goodsId) {
                    item.count +=
                        flag = true;
                    return true;
                }
            })

            // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {
                state.car.push(goodsInfo)
            }

            // 当 更新 car 之后，把 car 数组，存储到本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))

        },
        updateCar(state, goodsInfo) {
            // 修改购物车中商品的数量值
            state.car.some(item => {
                if (item.goodsId == goodsInfo.goodsId) {
                    item.count = parseInt(goodsInfo.count);
                    return true
                }
            })
            // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar(state, goodsId) {
            // 从 store 中删除对应的额那条商品数据
            state.car.some((item, i) => {
                if (item.goodsId == goodsId) {
                    state.car.splice(i, 1)
                    return true
                }
            })

            // 将删除完毕后，最新的购物车数据，同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            // {goodsId,val}
            state.car.some(item => {
                if (item.goodsId == info.goodsId) {
                    item.selected = info.selected
                }
            })
            // 把最新的 所有购物车商品的状态保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: { // this.$store.getters.****
        // 相当于 计算属性，也相当于 filters
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            })
            return c;
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.goodsId] = item.count
            })
            return o;
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.goodsId] = item.selected
            })
            return o;
        },
        getGoodsCountAndAmount(state) {
            var o = { count: 0, amount: 0 }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += (item.price * item.count)
                }
            })
            return o
        }
    }
})

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
Vue.filter('addZero', function (value) {
    return value.toFixed(2)
})

// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store // 挂载 store 状态管理对象
})