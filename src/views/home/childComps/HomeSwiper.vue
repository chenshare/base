<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper"
export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      isLoad:false
    }
  },
  methods:{
    imageLoad(){
      //图片加载完成之后，打印tabcontrol的offsettop高度，这里防止多次向父组件发送信息
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad=true

      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>

</style>