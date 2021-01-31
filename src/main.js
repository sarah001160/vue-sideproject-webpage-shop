// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import "bootstrap"
import VueAxios from 'vue-axios'
import axios from 'axios'//vueaxios類似ajax功能
import router from './router'
import Loading from 'vue-loading-overlay'; //讀取效果
import 'vue-loading-overlay/dist/vue-loading.css';//讀取效果
import './bus'; //匯入event.bus錯誤訊息回饋

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials=true;

Vue.component('Loading',Loading); //全域啟用Loading這個元件



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})

//記得加入導航守衛
router.beforeEach((to, from, next) => {
  console.log('to',to,'from',from,'next',next)
  if(to.meta.requiresAuth){
    const api =`${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response)=>{
      console.log(response.data);
      if(response.data.success){
        next()
      }else{
        next({
          path:'/login'
        })
      }
    })
  }else{
    next()
  }
})