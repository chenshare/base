<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"/>
      <span>全选</span>
      <span class="total-price">合计：{{totalPrice}}</span>
      <span class="buy-product">去计算({{checkLength}})</span>
    </div>

  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'
export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },

  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥'+this.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue+item.price*item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item=>item.checked).length
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .check-content{
    display: flex;
    align-items: center;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .total-price{
    font-size: 16px;
    color: #666;
    position: relative;
    left: 10px;

  }
  .buy-product{
    background-color: var(--color-high-text);
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    position: absolute;
    right: 0;
  }
</style>