<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">商品购物街</div></nav-bar>
    <tab-control   :title="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl1" class="scroll-tab-control" v-show="isTabFixed"></tab-control>
    <scroll
        class="content"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore">

      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>

      <recommend-view :recommend="recommend"></recommend-view>

      <feature-view></feature-view>

        <tab-control  :title="['流行','新款','精选']"
                      @tabClick="tabClick"
                      ref="tabControl2"></tab-control>

      <goods-list :goods="showGoods"></goods-list>

    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";


import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";




import {getHomeMultidata,getHomeGood} from "@/network/home";
import {itemListenerMixin,backTopMixin} from "@/common/mixin";


export default {
  name: "Home",
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,

  },
  data(){
    return{
     banners:[],
     recommend:[],
     goods:{
       'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
     currentType:'pop',
     tabOffSetTop:0,
     isTabFixed:false,
     saveY:0

    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    //请求多个数据
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGood('pop')
    this.getHomeGood('new')
    this.getHomeGood('sell')

  },
  mounted() {

  },
  mixins:[itemListenerMixin,backTopMixin],
  methods:{
    //tab事件请求相关方法
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop';
          break
        case 1:
          this.currentType='new';
          break
        case 2:
          this.currentType='sell';
          break
      }
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index
    },
    //网络请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banners=res.data.banner.list;
        this.recommend=res.data.recommend.list;
      })
    },
    getHomeGood(type){
      const page =this.goods[type].page+1
      getHomeGood(type,page).then(res=>{

        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
    //回到顶部相关方法

    //监听内容滑动相关方法
    contentScroll(position){
      //判断backtop是否显示
      this.isShowBackTop=-position.y>1000
      //决定tabcontrol是否吸顶
      this.isTabFixed=(-position.y)>this.tabOffSetTop

    },
    //加载更多相关方法
    loadMore(){
      this.getHomeGood(this.currentType)
    },
    //获取图片加载完后，tabcontrol的offsettop位置
    swiperImageLoad(){
      this.tabOffSetTop=this.$refs.tabControl2.$el.offsetTop;
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    this.saveY=this.$refs.scroll.getScrollY()

    this.$bus.$off('itemImgLoad',this.itemImgListener)

  }
}
</script>

<style scoped>
#home{
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: #d4237a;
  color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.scroll-tab-control{
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  z-index: 9;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/*.content{*/
/*  height: calc(100% - 93px);*/
/*  margin-top: 44px;*/

/*}*/

</style>
