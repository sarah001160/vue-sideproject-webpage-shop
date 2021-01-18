<template>
    <div class="products">
        <h2>Products內容</h2>
        <div>
            <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" @click="openModal(true)">建立新產品</button>
        </div>
    <table class="table mb-4 mt-4">
        <thead>
          <tr><!--標題列-->
              <th width="100">分類</th>
              <th width="100">產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="80">是否啟用</th>
              <th width="80">編輯</th> 
              <th width="30">刪除</th>  
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item) in products" :key="item.id">
                <td>{{item.category}}</td><!--分類-->
                <td>{{item.title}}</td><!--品名-->
                <td class="text-right">{{item.origin_price}}</td>   <!--原價-->
                <td>{{item.price}}</td> <!--售價-->
                <td>暫時空白</td> <!--是否啟用-->
                <td>
                   <button class="btn btn-outline-primary btn-sm" data-toggle="modal"  @click="openModal(false, item)">編輯</button>
                </td>
                <td>
                    <button class="btn btn-outline-danger
                     btn-sm">刪除</button>  
                </td>  

            </tr>
        </tbody>

    </table>

<!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">新增產品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span><!--X按鈕-->
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                      <label for="image">Link</label>
                      <input type="text" id="image" class="form-control" v-model="tempProducts.imageUrl">
                    </div>
                    <div class="form-group">
                      <label for="customerfile">or上傳圖片</label>
                      <input type="file" id="customerfile" class="form-control" ref="files" @change="uploadFile">
                    </div>
                     <img class="img-fluid" :src="tempProducts.imageUrl">
                 </div>
            
                <div class="col-sm-8">
                  <div class="form-group" col-md-6>
                      <label for="title" class="txt-left">標題</label>
                      <input type="text" id="title" class="form-control" v-model="tempProducts.title" placeholder="新增產品">
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input type="text" id="category" class="form-control" v-model="tempProducts.category" placeholder="請輸入分類">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="unit">單位</label>
                      <input type="text" id="unit" class="form-control" v-model="tempProducts.unit" placeholder="請輸入單位">
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="origin_pric">原價</label>
                      <input type="text" id="origin_pric" class="form-control" v-model="tempProducts.origin_price" placeholder="請輸入原價">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="text" id="price" class="form-control" v-model="tempProducts.price" placeholder="請輸入售價">
                    </div>
                  </div>
                  <hr>
                  <div class="form-group">
                    <label for="description">產品敘述</label>
                    <textarea type="text" id="description" class="form-control" v-model="tempProducts.description" placeholder="請輸入產品敘述"></textarea>
                  </div>
                   <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" id="content" class="form-control" v-model="tempProducts.content" placeholder="請說明產品內容"></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" v-model="tempProducts.is_enabled"
                       :true-value="1" :false-value="0" id="is_enabled">
                       <label for="is_enabled" class="form-check-label">是否啟用</label>
                    </div>
                  </div>
               </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct()">確認</button>
          </div>
        </div>
      </div>
    </div>

    </div>
</template>   

<script>
import $ from 'jquery'//
export default {
  data () {
    return {
      products:[],
      tempProducts:{}, //openModal()
      isNew:false, //預設false
    }
  },
  methods:{
    signout(){
      const api =`${process.env.APIPATH}/logout`;// 'https://vue-course-api.hexschool.io/admin/signin';
      const vm = this;
      this.$http.post(api).then((response)=>{ //使用post完送用戶帳號密碼
        console.log(response.data)
        if(response.data.success){//如果登入成功
          vm.$router.push('/login')//就把url網址導回首頁
        }
      })
    },
    getProducts(){
      const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products/all`//已改成後台api
      const vm = this;
      this.$http.get(api).then((response)=>{
        console.log(response.data)
        vm.products = response.data.products;//把api裡面的資料複製並代入data資料中的products陣列
      })
    },
    openModal(isNew,item){
      if(isNew){//isNew是true時(去看html 有true參數)
        this.tempProducts = {};
        this.isNew = true;//把data資料中的isNew改成true
      }else{//isNew是false時 帶入現有的資料 打開modal做編輯
        this.tempProducts = Object.assign({}, item); //es6語法,意思是建立一個空的物件{},然後把item的內容複製到空物件中
        this.isNew = false;//把data資料中的isNew改成false
      }
      $('#exampleModal').modal('show');//BS4寫法,去官網看
    },
    updateProduct(){//更新介面
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const vm =this;
      if(!vm.isNew){//flase非新建立的資料(已存在資料),就用put更新;反之用post新增
          api= `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProducts.id}`
          httpMethod = 'put';
       }
      this.$http[httpMethod](api,{data:vm.tempProducts}).then((response)=>{
        console.log(response.data)
        if (response.data.success) {
          $('#exampleModal').modal('hide');
          vm.getProducts();
        } else {
          $('#exampleModal').modal('hide');
          vm.getProducts();
          console.log('新增失敗');
        }
   
   })
    },
    uploadFile(){
      console.log(this);
      const uploadedFile = this.$refs.files.files[0];//去console.log查看this的資料,即可看見$refs裡面的files裡面的files第0筆資料
      const vm =this;
      const formData = new FormData(); //制式寫法,上網查new FormData()
      formData.append('file-to-upload',uploadedFile); //新增formData的寫法
      const url=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`; //上傳圖片用的api
      this.$http.post(url,formData,{ headers:{
                      'Content-type':'multipart/form-data'
                    }
                }).then((response)=>{
                    console.log(response.data)
                    if(response.data.success){
                        //  vm.tempProduct.imageUrl = response.data.imageUrl;
                        //  console.log(vm.tempProduct)//只寫到這一行的話,去console.log()看,settwer跟getter並沒有綁定
                         vm.$set(vm.tempProducts,'imageUrl',response.data.imageUrl)
                     }
                    })
    },
    //目前少一個刪除的功能,還沒學會(痛苦) 20210113
  },
  created(){
    this.getProducts();
    console.log(this.tempProducts)
    console.log("↑this.tempProducts")
  },
}
</script>

 <style scoped lang="scss">
 
   
 </style>