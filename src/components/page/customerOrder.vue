<template>
  <div class="customerOrder">
    <loading :active.sync="isLoading"></loading><!--全域讀取-->
    <div class="row mt-4">
        <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
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
                <button type="button" class="btn btn-outline-secondary btn-sm">查看更多</button>
                <button type="button" class="btn btn-outline-danger btn-sm ml-auto">加入購物車</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      vm.isLoading = true;//開啟讀取效果
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>