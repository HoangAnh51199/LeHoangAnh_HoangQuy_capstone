function Service() {

    this.arr = [];
    this.getListProductApi = function () {
        /**
         * promise
         * pending (chờ)
         * resolve(thành công)
         * reject thất bại
         */
        var promise = axios({
            url: "https://64b5375cf3dbab5a95c6f319.mockapi.io/api/product",
            method: "GET",
        });
        return promise;
    };

    

    this.deleteProductApi = function (id) {
        var promise = axios({
          url: `https://64b5375cf3dbab5a95c6f319.mockapi.io/api/product/${id}`,
          method: "DELETE",
        });
    
        return promise;
      };

      this.addProductApi = function (product) {//them bien product
        var promise = axios({
          url: "https://64b5375cf3dbab5a95c6f319.mockapi.io/api/product",
          method: "POST",
          data: product,
        });
    
        return promise;
      };

      this.getProductById =function (id) {
        var promise = axios({
          url: `https://64b5375cf3dbab5a95c6f319.mockapi.io/api/product/${id}`,
          method: "GET",
        });
    
        return promise;
    
      };
      this.updateProductApi =function (product){
        var promise = axios({
          url: `https://64b5375cf3dbab5a95c6f319.mockapi.io/api/product/${product.id}`,
          method: "PUT",
          data:product,
        });
        return promise;
      };
    


}
