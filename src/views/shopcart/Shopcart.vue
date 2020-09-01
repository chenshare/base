<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!--商品列表-->
    <shop-cart-list></shop-cart-list>
    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {mapGetters} from 'vuex'
import shopCartList from "@/views/shopcart/childComps/shopCartList";
import CartBottomBar from "@/views/shopcart/childComps/CartBottomBar";
export default {

  name: "Shopcart",
  components:{
    NavBar,
    shopCartList,
    CartBottomBar
  },
  computed:{
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-high-text);
  color: white;
  z-index: 9;
  position: relative;
}
</style>
