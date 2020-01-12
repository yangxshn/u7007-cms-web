<template>
  <div class="goodsInfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swipe :focusList="thumbnailList" :isFull="false"></swipe>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodsInfo.marketPrice}}</del>&nbsp;&nbsp;销售价：
            <span class="now">￥{{goodsInfo.sellPrice}}</span>
          </p>
          <p>
            购买数量：
            <numbox @getCount="getGoodsNum" :max="goodsInfo.stock"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <!-- 分析：如何实现加入购物车的时候，拿到选择的数量 -->
            <!-- 1. 经过分析发现：按钮属于 GoodsInfo 页面，数字属于 NumberBox 组件 -->
            <!-- 2. 由于涉及到父子组件的嵌套，所以，无法直接在 GoodsInfo 页面中 获取到 商品数量值 -->
            <!-- 3. 解决方案：涉及到了 子组件向父组件传值（事件调用机制） -->
            <!-- 4. 事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当作参数，传递给这个方法 -->
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsInfo.goodsCode}}</p>
          <p>库存情况：{{goodsInfo.stock}}件</p>
          <p>上架时间：{{goodsInfo.createTime | dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(goodsId)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(goodsId)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swipe from "../common/Swipe.vue";
import numbox from "../common/GoodsInfo_Numbox.vue";

export default {
  data() {
    return {
      goodsId: this.$route.params.goodsId,
      thumbnailList: [],
      goodsInfo: {},
      ballFlag: false, // 控制小球，显示与隐藏的标识符
      goodsNum: 1 // 保存用户选中的商品数量，默认，认为用户买一个
    };
  },
  created() {
    this.getGoodsThumbnail();
    this.getGoodsInfo();
  },
  methods: {
    getGoodsThumbnail() {
      this.$http.get("api/getGoodsThumbnail/" + this.goodsId).then(result => {
        if (result.body.code === 200) {
          // 先循环轮播图数组的每一项，为 item 添加 focusImg 和 focusId 属性
          result.body.data.forEach(item => {
            item.focusImg = item.src;
            item.focusId = item.id;
          });

          this.thumbnailList = result.body.data;
        } else {
          Toast("获取商品轮播图失败");
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/getGoodsInfo/" + this.goodsId).then(result => {
        if (result.body.code === 200) {
          this.goodsInfo = result.body.data;
        } else {
          Toast("获取商品信息失败");
        }
      });
    },
    goDesc(goodsId) {
      // 点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({ name: "goodsDesc", params: { goodsId } });
    },
    goComment(goodsId) {
      // 跳转到 评论页面
      this.$router.push({ name: "goodsComment", params: { goodsId } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      // 小球动画优化思路
      // 1. 先分析导致 动画 不准确的 本质原因：我们把小球最终位移到的位置，已经局限在了某一分辨率
      // 下的 滚动条未滚动的情况下
      // 2. 只要分辨率和测试的时候不一致，或者滚动条有一定的滚动距离之后，问题就出现了
      // 3. 因此，我们经过分析得到结论：不能把位置的 横纵坐标 直接写死了，而是应该根据不同情况，
      // 动态计算这个坐标值
      // 4. 经过分析，得到解决思路：先得到 徽标的横纵坐标，再得到 小球的横纵坐标，然后让 y值求差，
      // x值求差，得到的结果，就是 横纵坐标要位移的距离
      // 5. 如何获取 徽标和小球的位置？？？domObject.getBoundingClientRect()

      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取徽标在页面中的位置
      const badgePosition = document.getElementById('badge').getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68) ";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getGoodsNum(count){
      // 当子组件把选中的数量传递给父组件的时候，把选中的值保存到 data 上
      this.goodsNum = count;
      console.log('父组件拿到的数量值为：'+this.goodsNum)
    }
  },
  components: {
    swipe,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsInfo-container {
  background-color: #eee;
  overflow: hidden;

  .price {
    .now {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .mui-card-footer {
    display: block;

    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 150px;
  }
}
</style>