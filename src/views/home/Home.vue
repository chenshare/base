<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {getHomeMultidata} from "@/network/home";

export default {
  name: "Home",
  components:{
    NavBar
  },
  data(){
    return{
     banners:[],
     recommend:[],
    }
  },
  created() {
    getHomeMultidata().then(res=>{
      console.log(res);
      this.banners=res.data.banner.list;
      this.recommend=res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
.home-nav{
  background-color: #d4237a;
  color: #f6f6f6;
}
</style>
