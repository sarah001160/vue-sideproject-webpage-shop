//所有的路徑都在這邊設定哦
import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import CustomerOrder from '@/components/CustomerOrder';
import Products from '@/components/page/Products';
import customerOrder from '@/components/page/customerOrder';


Vue.use(VueRouter)
export default new VueRouter({
    routes:[
        {
            path:'*', //為避免有人在url亂輸入導致進入空白頁面,而設定此星號asterisk
            redirect:'login',//將會被重新導回登入頁面
        },
        {
            name:'首頁',
            path:'/helloworld',
            component:HelloWorld,
            children:[ //子分頁 藉由router直接顯示在HelloWorld元件中
                {
                    name:'products', 
                    path:'products',
                    component:Products,
                    meta:{requiresAuth:true},//meta:{requiresAuth:true}放在這邊表示必須登入以後才能看到products.vue
                }
            ],
        },
        {
            name:'我也不知道這是什麼',
            path:'/',
            component:HelloWorld,
            children:[
                {
                    name:'customerOrder',
                    path:'customerOrder',
                    component:customerOrder,
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