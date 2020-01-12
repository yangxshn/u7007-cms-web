<template>
  <div class="goods-list">
    <!-- <router-link class="goods-item" v-for="item in goodsList" :key="item.goodsId" :to="'/home/goodsInfo/'+item.goodsId" tag="div">
      <img :src="item.imageUrl" alt />

      <h1 class="title">{{item.title}}</h1>

      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sellPrice}}</span>
          <span class="old">￥{{item.marketPrice}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock}}件</span>
        </p>
      </div>
    </router-link>-->

    <!-- 在网页中，有两种跳转方式： -->
    <!-- 方式1：使用 a 标签 的形式叫做 标签跳转 -->
    <!-- 方式2：使用 window.location.href 的形式，叫做 编程式导航 -->
    <div
      class="goods-item"
      v-for="item in goodsList"
      :key="item.goodsId"
      @click="goDetail(item.goodsId)"
    >
      <img :src="item.imageUrl" alt />

      <h1 class="title">{{item.title}}</h1>

      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sellPrice}}</span>
          <span class="old">￥{{item.marketPrice}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock}}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1,
      goodsList: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 查询商品列表
      this.$http
        .get("api/getGoodsList?pageIndex=" + this.pageIndex)
        .then(result => {
          if (result.body.code === 200) {
            this.goodsList = this.goodsList.concat(result.body.data);
          } else {
            Toast("获取商品列表失败");
          }
        });
    },
    getMore() {
      this.pageIndex++;
      this.getGoodsList();
    },
    goDetail(goodsId) {
      // 使用 JS 的形式进行路由导航

      // 注意：一定要区分 this.$route 和 this.$router 这两个对象
      // 其中：this.$route 是路由【参数对象】，所有路由中的参数，params，query 都属于它
      // 其中：this.$router 是一个路由【导航对象】，用它可以方便的 使用JS代码，实现路由
      // 的前进、后退、跳转到新的 URL 地址
      console.log(this);
      // 1.最简单的
      // this.$router.push("/home/goodsInfo/" + goodsId);
      // 2.传递对象
      // this.$router.push({ path: "/home/goodsInfo/" + goodsId });
      // 3.传递命名的路由
      this.$router.push({ name: 'goodsInfo', params: { goodsId }})
      // 4。带查询参数，变成 /home/goodsInfo/?plan=private
      // this.$router.push({ path: "/home/goodsInfo/", query: { goodsId } });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 280px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0px;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>