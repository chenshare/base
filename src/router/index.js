import Vue from "vue";
import VueRouter from "vue-router"

const Home=()=>import('../views/home/Home')
const Category=()=>import('../views/category/Category')
const Profile=()=>import('../views/profile/Profile')
const Shopcart=()=>import('../views/shopcart/Shopcart')
const Detail=()=>import('../views/detail/Detail')
Vue.use(VueRouter)

const router=new VueRouter({
  routes:[
    {
      path:'',
      redirect:'/home'
    },
    {
      path: '/home',
      component:Home
    },
    {
      path: '/category',
      component:Category
    },
    {
      path: '/profile',
      component:Profile
    },
    {
      path: '/shopcart',
      component:Shopcart
    },
    {
      path: '/detail/:iid',
      component:Detail
    },

      ],
  mode:'history'
})

export default router