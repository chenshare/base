<template>
    <div class="cart-list">
      <scroll class="content" ref="scroll">
<!--        <li v-for="item in cartList">{{item}}</li>-->
        <shop-cart-list-item v-for="(item,index) in cartList"
                             :product="item"
                             :key="index"
        ></shop-cart-list-item>
      </scroll>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from "@/components/common/scroll/Scroll";
import shopCartListItem from "@/views/shopcart/childComps/shopCartListItem";
export default {
  name: "shopCartList",
  computed:{
    ...mapGetters(['cartList'])
  },
  components:{
    Scroll,
    shopCartListItem
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px);
}
.content{
  height: 100%;
  overflow: hidden;

}
</style>