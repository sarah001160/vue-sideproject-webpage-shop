import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import CustomerOrder from '@/components/CustomerOrder';
import Products from '@/components/page/Products';

Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        {
            path:'*', //為避免有人在url亂輸入導致進入空白頁面,而設定此
            redirect:'login',//將會被重新導回登入頁面
        },
        {
            name:'首頁',
            path:'/helloworld',
            component:HelloWorld,
            children:[
                {
                    name:'products',
                    path:'products',
                    component:Products,
                    meta:{requiresAuth:true},//必須登入以後才能看到products.vue
                }
            ],
        },
        {
            name:'登入',
            path:'/login',
            component:Login,
        },
        {
            name:'顧客訂單',
            path:'/customerorder',
            component:CustomerOrder,
        },
    ]
})