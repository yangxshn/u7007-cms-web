import VueRouter from 'vue-router'

// 导入对应的路由组件
import Home from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import Search from './components/tabbar/Search.vue'
import Shopcar from './components/tabbar/Shopcar.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

var router = new VueRouter({
    routes: [ // 配置路由规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/member', component: Member },
        { path: '/shopcar', component: Shopcar },
        { path: '/search', component: Search },
        { path: '/home/newsList', component: NewsList },
        { path: '/home/newsInfo/:newsId', component: NewsInfo }
    ],
    linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类 router-link-active
})


export default router