<template>
  <div>
    <ul class="mui-table-view">

      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.newsId">
        <router-link :to="'/home/newsInfo/' + item.newsId">
          <img
            class="mui-media-object mui-pull-left" :src="item.newsImg"
          />
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{ item.createTime | dataFormat }}</span>
              <span>点击：{{ item.clickNum }} 次</span>
            </p>
          </div>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      newsList: []
    };
  },
  created(){
      this.getNewsList()
  },
  methods: {
    getNewsList() {
      this.$http.get("api/getNewsList").then(result => {
        if (result.body.code === 200) {
          this.newsList = result.body.data;
        } else {
          Toast("加载新闻列表失败");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>