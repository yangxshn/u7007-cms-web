<template>
  <div class="mui-numbox" data-numbox-min="1" style="height:25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initCount"
      @change="countChanged"
      ref="numberbox" readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>

  <!-- 分析：子组件什么时候把 数据传递给 父组件 -->
  <!--  -->
</template>

<script>
// 导入 MUI 的 JS 文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {};
  },
  mounted() {
    // 初始化数字选择框
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
        // 每当数量值改变，则立即把最新的数量同步到 购物车的 store 中，覆盖之前的数量值
        this.$store.commit('updateCar',{ goodsId:this.goodsId,count:this.$refs.numberbox.value })
    }
  },
  props:["initCount","goodsId"]
};
</script>

<style lang="scss" scoped>
</style>