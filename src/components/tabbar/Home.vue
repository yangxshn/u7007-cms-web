<template>
  <div>
    <!-- 轮播图区域 -->
    <swipe :focusList="focusList" :isFull="true"></swipe>

    <!-- 九宫格区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../../images/menu1.png" alt />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/imageList">
          <img src="../../images/menu2.png" alt />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodsList">
          <img src="../../images/menu3.png" alt />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu5.png" alt />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swipe from "../common/Swipe.vue";

export default {
  data() {
    return {
      focusList: []
    };
  },
  created() {
    this.getFocusList();
  },
  methods: {
    getFocusList() {
      this.$http.get("api/getFocusList").then(result => {
        if (result.body.code === 200) {
          this.focusList = result.body.data;
        } else {
          Toast("加载轮播图失败");
        }
      });
    }
  },
  components:{
    swipe
  }
};
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;

  .mui-table-view-cell {
    border: none;
  }

  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body {
    font-size: 13px;
  }
}
</style>