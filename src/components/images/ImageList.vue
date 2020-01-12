<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.catId==0?'mui-active':'']"
            v-for="item in imageCategoryList"
            :key="item.catId" @tap="getImageList(item.catId)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="image-list">
      <router-link v-for="item in imageList" :key="item.imageId" :to="'/home/imageInfo/'+item.imageId" tag="li">
        <img v-lazy="item.imageUrl" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.summary }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
// 导入 MUI 的 JS 文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      imageCategoryList: [],
      imageList: []
    };
  },
  created() {
    this.getImageCategoryList();
    // 进入页面，获取所有图片列表
    this.getImageList(0)
  },
  mounted() {
    // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为这时候的DOM元素是最新的
    // 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getImageCategoryList() {
      this.$http.get("api/getImageCategoryList").then(result => {
        if (result.body.code === 200) {
          result.body.data.unshift({ title: "全部", catId: 0 });
          this.imageCategoryList = result.body.data;
        } else {
          Toast("获取图片分类失败");
        }
      });
    },
    getImageList(catId) {
      this.$http.get("api/getImageList/" + catId).then(result => {
        if (result.body.code === 200) {
          this.imageList = result.body.data;
        } else {
          Toast("获取图片列表失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.image-list{
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li{
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img{
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info{
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0,0,0,0.4);
      max-height: 84px;
      .info-title{
        font-size: 14px;
      }
      .info-body{
        font-size: 13px;
      }
    }
  }
}


</style>