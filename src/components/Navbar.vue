<template>
  <div class="navbar bg-primary">
          <ul>
            <li>
              <router-link style="color:red;" to="helloworld/products">產品列表</router-link>
            </li>
            <li><a class="nav-link" href="#">後台管理</a></li>
            <li><router-link  to="/customerOrder">模擬訂單</router-link></li>
         </ul>
  </div>
</template>

<style scoped lang="scss">
    *{
        list-style:none;
        margin:0;
        padding:0;
    }
 
 

    
  
</style>

<script>//這邊可以加jQuery嗎?

</script>