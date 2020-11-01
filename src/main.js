// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import "bootstrap"
import VueAxios from 'vue-axios'
import axios from 'axios'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials=true

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