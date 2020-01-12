<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <!-- 将来，谁使用此轮播图组件，谁为我们传递 focusList -->
      <!-- 此时，focusList 应该是父组件向子组件传值来设置  -->
      <mt-swipe-item v-for="item in focusList" :key="item.focusId">
        <img :src="item.focusImg" alt :class="{'full':isFull}"/>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<!-- 分析：为什么 商品评论中的 轮播图那么丑 -->
<!-- 1. 首页中的图片，它的宽和高，都是 使用了 100% 的宽度 -->
<!-- 2. 在商品详情页面中，轮播图的图片，如果也使用宽度为 100% 的话，页面不好看了  -->
<!-- 3. 商品详情页面中的轮播图，期望高度为100%，但是宽度为自适应 -->
<!-- 4. 经过分析，得到问题的原因：首页中的轮播图 和 详情页中的轮播图，分歧点是 宽度到底是 100% 还是 自适应 -->
<!-- 5. 既然这两个轮播图，其它方面都i是没有冲突的，只是宽度有分歧，那么，我们可以定义一个属性，让使用轮播图的调用者，
手动指定是否为 100% 的宽度 -->

<script>
export default {
  props: ["focusList", "isFull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
      text-align: center;
    // &:nth-child(1) {
    //   background-color: red;
    // }
    // &:nth-child(2) {
    //   background-color: blue;
    // }
    // &:nth-child(3) {
    //   background-color: cyan;
    // }

    img {
      //   width: 100%;
      height: 100%;
    }
  }
}

.full{
    width: 100%;
}
</style>