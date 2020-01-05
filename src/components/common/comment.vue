<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />

    <textarea placeholder="请输入要BB的内容（最多BB120个字）" maxlength="120"></textarea>

    <mt-button type="primary" size="large">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in commentList" :key="item.commentId">
        <div
          class="cmt-title"
        >第{{ index+1 }}楼&nbsp;&nbsp;用户：{{ item.username }}&nbsp;&nbsp;发表时间：{{ item.createTime | dataFormat }}</div>
        <div class="cmt-body">{{ item.content === 'undefined'?'此用户很懒，未作出评论':item.content }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1,
      commentList: []
    };
  },
  created() {
    this.getCommentList();
  },
  methods: {
    getCommentList() {
      // 获取评论
      this.$http
        .get(
          "api/getNewsCommentList/" +
            this.newsId +
            "?pageIndex=" +
            this.pageIndex
        )
        .then(result => {
          if (result.body.code === 200) {
            // 拼接数组
            this.commentList = this.commentList.concat(result.body.data)
          } else {
            Toast("查询评论列表失败");
          }
        });
    },
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getCommentList()
    }
  },
  props: ["newsId"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>