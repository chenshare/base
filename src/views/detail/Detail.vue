<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";


import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail"
import {debounce} from "@/common/utils";
import {itemListenerMixin,backTopMixin} from "@/common/mixin";

export default {
  name: "Detail",
  data(){
    return {
      iid:'',
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopYs:null,
      currentindex:null,


    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,

  },
  mixins:[itemListenerMixin,backTopMixin],
  created() {
    //获取iid
    this.iid=this.$route.params.iid
    //请求详情数据
    getDetail(this.iid).then(res=>{

      //获取数据
      const data=res.result

      //取出轮播图的数据
      this.topImages=data.itemInfo.topImages

      //创建商品的对象
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      //取出店铺的信息
      this.shop=new Shop(data.shopInfo)

      //取出详情的信息
      this.detailInfo=data.detailInfo

      //取出参数的信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //取出评论信息
      if(data.rate.list){
        this.commentInfo=data.rate.list[0]
      }

      this.getThemeTopYs=debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
        this.themeTopYs.push(Number.MAX_VALUE)

      },100)

    })
    //请求推荐数据
    getRecommend().then(res=>{
      this.recommends=res.data.list

    })
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopYs()

    },
    titleClick(index){
      console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
    },


    //滚动内容显示对应标题
    contentScroll(position){
      const positionY=-position.y
      let length=this.themeTopYs.length
      for (let i=0;i<length-1;i++){
        if(this.currentindex!==i  &&  (positionY>this.themeTopYs[i] &&  positionY<this.themeTopYs[i+1])){
          this.currentindex=i
          this.$refs.nav.currentindex=this.currentindex
        }
      }

      //是否显示backTop
      this.isShowBackTop=positionY>1000
    },
    addToCart(){
     const product={};
     product.image=this.topImages[0];
     product.title=this.goods.title;
     product.desc=this.goods.desc;
     product.price=this.goods.nowPrice;
     product.iid=this.iid;
     this.$store.dispatch('addCart',product)
    }


  },
  mounted() {

  },
  destroyed() {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 58px);
}
</style>