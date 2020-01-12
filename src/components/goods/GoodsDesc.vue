<template>
  <div class="goodsDesc_container">
    <h3>{{goodsDesc.title}}</h3>
    <hr>
    <div class="content" v-html="goodsDesc.content"></div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      goodsDesc: {},
      goodsId: this.$route.params.goodsId
    };
  },
  created() {
    this.getGoodsDesc();
  },
  methods: {
    getGoodsDesc() {
      this.$http.get("api/getGoodsDesc/" + this.goodsId).then(result => {
          if(result.body.code === 200){
              this.goodsDesc = result.body.data
          }else{
              Toast("获取商品信息失败");
          }
      });
    }
  }
};
</script>

<style lang="scss">
.goodsDesc_container{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    .content{
        img{
            width: 100%;
        }
        font-size: 12px;
    }
}
</style>