<template>
  <div class="newsInfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsInfo.title }}</h3>
    <!-- 小标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsInfo.createTime | dataFormat }}</span>
      <span>点击了：{{ newsInfo.clickNum }} 次</span>
    </p>

    <hr />

    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.details"></div>

    <!-- 评论区域 -->
    <comment-box :newsId="this.newsId"></comment-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from "../common/comment.vue";

export default {
  data() {
    return {
      newsId: this.$route.params.newsId, // 将 URL 地址中传递过来的 Id 值，挂载到 data 上，方便以后调用
      newsInfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$http.get("api/getNewsInfo/" + this.newsId).then(result => {
        if (result.body.code === 200) {
          this.newsInfo = result.body.data;
        } else {
          Toast("获取新闻信息失败");
        }
      });
    }
  },
  components: {
    "comment-box": comment
  }
};
</script>

<style lang="scss">
.newsInfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>