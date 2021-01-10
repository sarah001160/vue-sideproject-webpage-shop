<template>
    <div>
        <h1>Login</h1>
        <input type="email" placeholder="email" v-model="user.username">
        <br>
        <input type="password" placeholder="password" v-model="user.password">
        <br>
        <button class="btn btn-primary" @click="signin()">login</button>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                user:{
                    username:'',
                    password:'',
                }
            }
        },
        methods:{
            signin(){
                const api =`${process.env.APIPATH}/admin/signin`;//api已更正 'https://vue-course-api.hexschool.io/admin/signin';
                const vm = this;
                this.$http.post(api, vm.user).then((response)=>{ //使用post完送用戶帳號密碼
                    console.log(response.data)
                    if(response.data.success){//如果登入成功
                        const token = response.data.token;
                        const expired = response.data.expired;
                        console.log(token,expired);
                        console.log("↑token及expired")
                        document.cookie = `hexToken = ${token};expires=${new Date (expired)};`
                       vm.$router.push('/helloworld/products')//把url網址導回首頁
                    }
                });
            }
        }
       
    }


</script>
<style scoped>
    input,button{
        margin-top:20px;
        height:50px;
    }
    button{
        width:200px;
    }
</style>