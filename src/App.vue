<template>
  <div id="app">
    <router-view></router-view><!--HelloWorld.vue-->

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}

// router.beforeEach((to,from,next)=>{
//   console.log('to',to,'from',from,'next',next)

// })
</script>

<style lang="scss">/*這裡的css設定會影響所有的元件components*/
@import "./assets/all.scss";

#app{
  text-align:center;
  height:100vh;
}
 
</style>
