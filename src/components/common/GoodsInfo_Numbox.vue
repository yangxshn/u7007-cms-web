<template>
  <!-- 问题：我们不知道什么时候能够拿到 max 值，但是，总归有一刻，会得到一个真正的 max 值 -->
  <!-- 我们可以 使用 watch 属性监听，来 监听 父组件传递过来的 max 值，不管 watch 会触发几次，
  但是，最后一次，肯定是一个 合法的 max 值-->
  <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="numberbox"
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
      // 每当文本框变得值被修改的时候，立即把最新的数据，通过事件绑定，传递给父组件
      // console.log(this.$refs.numberbox.value)
      this.$emit("getCount", parseInt(this.$refs.numberbox.value));
    }
  },
  props: ["max"],
  watch: {
    // 属性监听
    max: function(newVal, oldVal) {
      // 使用 JS API 设置 numbox的 最大值
      mui(".mui-numbox")
        .numbox()
        .setOption("max", newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>