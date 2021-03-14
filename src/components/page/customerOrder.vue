<template>
  <div class="customerOrder">
    <loading :active.sync="isLoading"></loading><!--全域讀取-->
    <div class="row mt-4">
        <div class="col-md-4 mb-4" v-for="item in products" :key="item.id"><!--for迴圈-->
            <div class="card border-0">
                <div style="height:150px; background-size:cover;background-position:center" :style="{backgroundImage:`url(${item.imageUrl})`}"></div>
            </div>
            <div class="card-body">
                <span class="badge badge-info float-right ml-2">{{item.category}}</span>
                <h5 class="card-title">
                    <a href="#">{{item.title}}</a>
                </h5>
            </div>
            <div class="card-footer" style="box-sizing:border-box;">
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="getAProduct(item.id)">
                  <i class="fas fa-spinner fa-sapin" v-if="status.loadingItem===item.id"></i>  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                   <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i> 加入購物車
                </button>
            </div>
        </div>
    </div>

    <!--a Product  modal-->
    <div class="modal fade bd-example-modal-lg" id="productModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ aProduct.title }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <img :src="aProduct.imageUrl" class="img-fluid" alt="">
                  <blockquote>
                      <p>{{aProduct.content}}</p>
                      <footer>{{aProduct.description}}</footer>
                  </blockquote>
                  <div class="d-flex">
                    <div class="h4" v-if="!aProduct.price">{{aProduct.origin_price}}元</div>
                    <del class="h6" v-if="aProduct.price">原價{{aProduct.origin_price}}元</del>
                    <div class="h4">現在只要{{aProduct.price}}元</div>
                  </div>
                  <select name="" id="" class="form-control mt-3" v-model="aProduct.num">
                      <option :value="num" v-for="num in 10" :key="num">
                          選購{{num}} {{aProduct.unit}}
                      </option>
                  </select>
            </div>
            <div class="modal-footer">
                <div class="text-muted">
                  小計<strong>{{aProduct.num*aProduct.price}}元</strong>
                </div>
                <button type="button" class="btn btn-primary" @click="addtoCart(aProduct.id,aProduct.num)">
                   加到購物車
                </button>
            </div>
        </div>
       
      </div>
    </div>


    <!---購物車列表 自己寫-->
    <h2 style="margin-top:50px; background:white;">↓↓已加入購物車的列表↓↓</h2>
    <table style="margin:100px auto 100px auto; width:300px; min-height:200px;">
        <thead style="border-bottom:1px solid black">
            <tr>
                <th></th>
                <th style="width:200px;">品名</th>
                <th style="width:100px;">數量</th>
                <th style="width:100px;">單價</th>
                <th>總計</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
              <td><button type="button" @click="removeCartItem(item.id)">刪</button></td>
              <td>{{item.product.title}}<div class="text-success" v-if="item.coupon"></div></td>
              <td>{{item.qty}}</td>
              <td>{{item.product.price}}</td>
              
          </tr>
        </tbody>
        
    </table>
    <input type="text" placeholder="請輸入優惠碼">
    <button @click="addCouponCode">套用優惠碼</button>
    
    <!--建立表單-->
    <div class="my-5 row justify-content-center">
      <validation-observer v-slot="{invalid}"  class="col-md-6">
           <form @submit.prevent="createOrder">
            <!-- 1
              <div class="form-group">
                <label for="useremail">Email</label>
                <input type="email" class="form-control" name="email" id="useremail"
                  placeholder="請輸入 Email" v-validate="'required|email'"
                  :class="{'is-invalid':errors.has('email')}" 
                  v-model="form.user.email">
                <span class="text-danger" v-if="errors.has('email')">
                  {{errors.first('email')}}          
                </span>
              </div> -->

              <validation-provider class="form-group" rules="required|email" v-slot="{errors,classes }">
                    <!--這是一個元件，會導入驗證規則ruels那一段required表示必填，垂直線條右邊再加入其他規則，
                    以及slot可以將外部元件的data傳入的slot裡面-->
                      <!-- 輸入框 -->
                  <div class="form-group">
                      <label for="email">Email</label>
                      <input id="email" type="email" name="email" v-model="form.user.email"
                           class="form-control" :class="classes"><!--這個classes就是main.js裡面configure的classes--->
                      <!-- 錯誤訊息 -->
                      <span class="invalid-feedback">{‌{ errors[0] }}</span>
                  </div>
              </validation-provider>
             
            <!--2-->
            <!-- <div class="form-group">
              <label for="username">收件人姓名</label>
              <input type="text" class="form-control" name="name" id="username"
              placeholder="輸入姓名">
              <span class="text-danger">姓名必須輸入</span>
            </div>
            <!--3-->
            <!-- <div class="form-group">
              <label for="usertel">收件人電話</label>
              <input type="tel" class="form-control" id="usertel"
                placeholder="請輸入電話">
            </div> -->
            <!--4-->
            <!-- <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input type="text" class="form-control" name="address"
                id="useraddress" placeholder="請輸入地址">
              <span class="text-danger">地址欄位不得留空</span>
            </div> -->
            <!--5-->
            <!-- <div class="form-group">
              <label for="useraddress">留言</label>
              <textarea name="" id="" class="form-control" cols="30" rows="10">
                
              </textarea>
            </div>---->
            <div class="text-right">
                <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
            </div> 
          </form>
      </validation-observer>
       
    </div>

    


  
  </div>

       
</template>

<script>
import $ from 'jquery';
//匯入jQuery的寫法,要記得加這一句


export default {
  data() {
    return {
      products: [],//存放response.data.products 陣列
      aProduct:{},//存放個別product 物件
      isLoading: false,//讀取效果的開關 全域讀取
      status:{
        loadingItem:'',//另一種讀取效果,就不用使用isLoading
      },
      cart:{ },
      coupon_code:'',
    };
  },
  methods: {
    getProducts(page=1) {//es6寫法 參數放1
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;//和products.vue的api一樣
      vm.isLoading = true;//開啟讀取效果
      this.$http.get(url).then((response) => { //取得api的資料
        //這邊先打開modal
         console.log(response);//先看一下response.data有什麼
        vm.products = response.data.products;
        vm.isLoading = false;//關閉讀取效果
      });
    },
    getAProduct(id){
      const vm = this;
      const url=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem= id;//開啟讀取 查看目前讀取哪一個資料
      this.$http.get(url).then((response)=>{
          console.log(response.data)
        //讀取資料以後把modal打開
        vm.aProduct = response.data.product;
         $('#productModal').modal('show');//BS4範本
         vm.status.loadingItem='';//關閉讀取
        
      })

    },
    addtoCart(id,qty=1) {
      const vm =this;
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;//打開讀取
        const cart={
          product_id:id,
          qty,
        };
      this.$http.post(url,{data:cart}).then((response)=>{//注意資料結構,data{}裡面包著cart
        console.log(response);
        vm.status.loadingItem = '';//關閉讀取
        vm.getCart();//加入購物車之後 要取得購物車列表
         $('#productModal').modal('hide')
      });
    },
    getCart(){//更新購物車資料
      const vm =this;
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;//抓下 api資料
      this.$http.get(url).then((response)=>{
        console.log(response.data) //看一下資料內容
        vm.cart = response.data.data; 
      })
    },
    removeCartItem(id){
      const vm =this;
      const url=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading=true;
      this.$http.delete(url).then((response)=>{
        console.log(response.data)
        vm.getCart();//再重新取得一次購物車頁面
        vm.isLoading=false;
      })
    },
    addCouponCode(){ // 加入優惠碼
      const vm =this;
      const url=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon={
        code:vm.coupon_code,
      }
      vm.isLoading=true;
      this.$http.post(url,{data:coupon}).then((response)=>{
        console.log(response.data);
        vm.getCart();
        vm.isLoading=false;
      })

    },
  },
  created() {
    this.getProducts();//取得全部商品陣列
    this.getCart();//取得購物車列表
  },
};
</script>