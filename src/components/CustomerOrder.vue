<template>
  <div class="customerorder">
    <h1>商品列表Customer</h1>
    <ul>
      <li class="bg-primary">商品一
        <div class="bg-danger">加入購物車這樣要怎麼樣把資料匯入Vue?要用v-for</div>
      </li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
     
    </ul>
    <ul>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .customerorder{
    h1{
      margin:40px;
    }
    ul{
      margin-top:20px;
      width:100%;
      display:flex;
      padding:0 30px;
      justify-content:space-between;
      li{
        flex-direction:row;
        list-style:none;
        width:20%;
        height:300px;
        border:1px solid red;
        position:relative;
        div{
          position:absolute;
          bottom:0;
        }
      }
    }
  }
</style>