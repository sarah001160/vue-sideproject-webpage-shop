import Vue from 'vue';

Vue.prototype.$bus = new Vue();//掛載$bus變數
//把上面的event.bus注入到main.js