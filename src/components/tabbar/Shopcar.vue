<template>
  <div class="shopcar-container">
    <!-- 购物车列表 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item,i) in goodsList" :key="item.goodsId">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch 
              v-model="$store.getters.getGoodsSelected[item.goodsId]"
              @change="selectedChange(item.goodsId,$store.getters.getGoodsSelected[item.goodsId])"></mt-switch>

            <img :src="item.imageUrl" alt />

            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sellPrice}}</span>
                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                <!-- 1. 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据，把 当前循环
                这条商品的 id，作为 对象的 属性名，count值作为 对象的 属性值，这样，当把所有的
                商品循环一遍，就会得到一个对象：{ 88:2,89:1,90:4 } -->
                <numbox :initCount="$store.getters.getGoodsCount[item.goodsId]" :goodsId="item.goodsId"></numbox>
                <a href="#" @click.prevent="remove(item.goodsId,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner settle">

          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，
            总价 <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount | addZero }}</span></p>
          </div>

          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

    <!-- <p>{{ $store.getters.getGoodsSelected }}</p> -->

  </div>
</template>

<script>
import numbox from "../common/Shopcar_Number.vue";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      goodsList: [] // 购物车中所有商品的数据
    };
  },
  created(){
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 1、获取到 store 中所有的商品的id，然后拼接出一个 用逗号分隔的 字符串
      var goodsIds = [];
      this.$store.state.car.forEach(item => goodsIds.push(item.goodsId));
      // 2、如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
      if(goodsIds.length <= 0){
        return;
      }
      // 3、获取购物车商品列表
      this.$http
        .get("api/getShopcarList/" + goodsIds.join(","))
        .then(result => {
          if (result.body.code === 200) {
            this.goodsList = result.body.data;
          } else {
            Toast("获取商品列表失败");
          }
        });
    },
    remove(goodsId,index){
      // 点击删除，把商品从 store 中根据 传递的 goodsId 删除，同时，把当前组件中 goodsList 中，对应要删除的那个商品，使用 index 来删除
      this.goodsList.splice(index,1)
      this.$store.commit('removeFromCar',goodsId)
    },
    selectedChange(goodsId,val){
      // 每当点击开关，把最新的 开关状态，同步到 store 中
      // console.log(goodsId + "-----"+ val) 
      this.$store.commit('updateGoodsSelected',{goodsId:goodsId,selected:val})
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;

  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      height: 60px;
      width: 60px;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
      h1 {
        font-size: 13px;
      }
    }
  }

  .settle{
    display:flex;
    justify-content: space-between;
    align-items: center;
    .red{
      color: red;
      font-weight: bold;
      font-size: 16px;
    }

  }
}
</style>