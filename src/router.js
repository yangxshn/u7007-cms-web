import VueRouter from 'vue-router'

// 导入对应的路由组件
import Home from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import Search from './components/tabbar/Search.vue'
import Shopcar from './components/tabbar/Shopcar.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import ImageList from './components/images/ImageList.vue'
import ImageInfo from './components/images/ImageInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

var router = new VueRouter({
    routes: [ // 配置路由规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/member', component: Member },
        { path: '/shopcar', component: Shopcar },
        { path: '/search', component: Search },
        { path: '/home/newsList', component: NewsList },
        { path: '/home/newsInfo/:newsId', component: NewsInfo },
        { path: '/home/imageList', component: ImageList },
        { path: '/home/imageInfo/:imageId', component: ImageInfo },
        { path: '/home/goodsList', component: GoodsList },
        { path: '/home/goodsInfo/:goodsId', component: GoodsInfo, name: 'goodsInfo' },
        { path: '/home/goodsDesc/:goodsId', component: GoodsDesc, name: 'goodsDesc' },
        { path: '/home/goodsComment/:goodsId', component: GoodsComment, name: 'goodsComment' },
    ],
    linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类 router-link-active
})


export default router