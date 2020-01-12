<template>
  <div class="imageInfo-container">
    <h3>{{ imageInfo.title }}</h3>

    <p class="subTitle">
      <span>发表时间：{{ imageInfo.createTime | dataFormat }}</span>
      <span>点击：{{ imageInfo.clickNum }} 次</span>
    </p>

    <hr />

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <vue-preview :slides="thumbnail" @close="handleClose"></vue-preview>
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html="imageInfo.content"></div>

    <!-- 放置一个现成的评论子组件 -->
    <cmt-box :imageId="imageId"></cmt-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
// 导入评论子组件
import comment from "./comment.vue";

export default {
  data() {
    return {
      imageId: this.$route.params.imageId,
      imageInfo: {},
      thumbnail: []
    };
  },
  created() {
    this.getImageInfo();
    this.getThumbnail();
  },
  methods: {
    getImageInfo() {
      // 获取图片的详情
      this.$http.get("api/getImageInfo/" + this.imageId).then(result => {
        if (result.body.code === 200) {
          this.imageInfo = result.body.data;
        } else {
          Toast("获取图片信息失败");
        }
      });
    },
    handleClose() {
      // 关闭事件
      console.log("close event");
    },
    getThumbnail() {
      // 获取缩略图
      this.$http.get("api/getImageThumbnail/" + this.imageId).then(result => {
        if (result.body.code === 200) {
          // 循环 图片数据，补全相关属性
          result.body.data.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          });
          // 保存数据
          this.thumbnail = result.body.data;
        } else {
          Toast("获取图片信息失败");
        }
      });
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
.imageInfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subTitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    /deep/ .my-gallery {
      display: flex;
      flex-wrap: wrap;
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
          box-shadow: 0 0 8px #999;
        }
      }
    }
  }
}
</style>