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
import currencyFilter from './components/filters/currency';//啟用千分位符號
import { //表單驗證用
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
  configure} from 'vee-validate';
import TW from 'vee-validate/dist/local/zh_TW.json'
import * as rules from 'vee-validate/dist/rules' //表單驗證用





Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials=true;

Vue.component('Loading',Loading); //全域啟用Loading這個元件
Vue.filter('currency',currencyFilter)//啟用filter 第一個輸入檔案名稱 第二個輸入自訂義名稱

Object.keys(rules).forEach((rule)=>{ //表單驗證用
    extend(rule, rules[rule]);
});
localize('zh_TW',TW);
Vue.component('ValidationObserver', ValidationObserver);//表單驗證用
Vue.component('ValidationProvider', ValidationProvider);  //表單驗證用
configure({//表單驗證用
  classes:{
    valid:'is-valid',
    invalid:'is-invalid'
  }
});
  
  



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