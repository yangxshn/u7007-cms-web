<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />

    <textarea placeholder="请输入要BB的内容（最多BB120个字）" maxlength="120" v-model="content"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

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
      pageIndex: 1, // 页码
      commentList: [], // 评论列表
      content: "" // 评论内容
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
            this.commentList = this.commentList.concat(result.body.data);
          } else {
            Toast("查询评论列表失败");
          }
        });
    },
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getCommentList();
    },
    postComment() {
      // 发表评论
      // 校验是否为空内容
      if (this.content.trim().length === 0) {
        return Toast("评论内容不能为空");
      }

      //alert(this.$route.params.newsId);
      // 1. 参数1：请求的URL地址
      // 2. 参数2：提交给服务器的数据对象 { content : this.content}
      // 3. 参数3：定义提交时候，表单中数据的格式，{ emulateJson : true }
      this.$http
        .post("api/postNewsComment/" + this.newsId, {
          content: this.content.trim()
        })
        .then(function(result){
          if (result.body.code === 200) {
            // 拼接评论对象
            var cmt = {
              username: "test1",
              createTime: Date.now(),
              content: this.content.trim()
            };
            this.commentList.unshift(cmt);
            this.content = "";
          } else {
            Toast(result.body.message);
          }
        });
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