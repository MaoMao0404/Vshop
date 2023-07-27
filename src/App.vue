<template>
  <div>
    <Header/>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- Home Search显示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>

</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name:'APP',
  components:{
    Header,
    Footer
  },
  mounted(){
    // 优化 请求只发一次
    // 通知vuex获取商品分类三级列表数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>