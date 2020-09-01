<template>
  <div class="check-button">
    <div class="icon-selector" :class="{check:isCheck}" @click="selectItem">
      <img src="~/assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  methods:{
    selectItem(){
    }
  },
  props:{
    isCheck:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
  .check-button{
    border-radius: 50%;
    border: 2px solid #d4237a;
  }
  .check{
    background-color: #d4237a;
    border-color: #d4237a;
  }
</style>