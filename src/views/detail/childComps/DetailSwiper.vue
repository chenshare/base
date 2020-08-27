<template>

    <swiper>
      <swiper-item v-for="(item,index) in topImages" class="item" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>

</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper"
export default {
name: "DetailSwiper",
  props:{
    topImages:{
      type:Array,
      default(){
        return []
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
.item{
  height: 300px;

}
</style>