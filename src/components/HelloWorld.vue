<template>
  <div class="helloWorld pt-5">
    <a  href="#" class="text-right" @click="signout()">登出</a>
    <Alert></Alert><!--錯誤訊息回饋-->
    <Navbar></Navbar>
    <router-view></router-view><!--products.vue或是customerOrder.vue/去看index.js及navbar-->
       
  </div>
</template>

<script>
/*$ global */
import Navbar from '@/components/Navbar'
import Alert from './Alert'//匯入Alert元件(掛載在Vue原型)

export default {
  name: 'HelloWorld',
  data () {
    return {
      products:[],
      tempProducts:{},
      isNew:false,
    }
  },
  components:{
    Navbar,
    Alert,
   
  },
  methods:{
    signout(){
      const api =`${process.env.APIPATH}/logout`;// 'https://vue-course-api.hexschool.io/admin/signin';
      const vm = this;
      this.$http.post(api).then((response)=>{ //使用post新增到api(傳送用戶帳號密碼到api)
        console.log(response.data)
        if(response.data.success){//如果登出成功
          vm.$router.push('/login')//就把url網址導回登入頁面
        }
      })
    },
    getProducts(){
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products/all`
      const vm = this;
      this.$http.get(api).then((response)=>{
        console.log(response.data)
        vm.products = response.data.products;
      
      })
    },
  },
  created(){
    this.getProducts();
    console.log(this.tempProducts)
    const myCookie =document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    console.log('myCookie', myCookie)
    this.$http.defaults.headers.common.Authorization = myCookie;
 },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 /*scope表示區域 只會在這張頁面裡套用樣式*/ 
</style>
