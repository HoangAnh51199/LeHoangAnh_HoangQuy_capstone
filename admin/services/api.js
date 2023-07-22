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
            url: "https://64b8c9de21b9aa6eb07a37ed.mockapi.io/api/Products",
            method: "GET",
        });
        return promise;
    };

    this.timKiemProductApi = function () {
        var promise = axios({
            url: "https://64b8c9de21b9aa6eb07a37ed.mockapi.io/api/Products",
            method: "GET",
        });

         return promise;
        

           

    };

    this.deleteProductApi = function (id) {
        var promise = axios({
          url: `https://64b8c9de21b9aa6eb07a37ed.mockapi.io/api/Products/${id}`,
          method: "DELETE",
        });
    
        return promise;
      };

      this.addProductApi = function (product) {//them bien product
        var promise = axios({
          url: "https://64b8c9de21b9aa6eb07a37ed.mockapi.io/api/Products",
          method: "POST",
          data: product,
        });
    
        return promise;
      };

      this.getProductById =function (id) {
        var promise = axios({
          url: `https://64b8c9de21b9aa6eb07a37ed.mockapi.io/api/Products/${id}`,
          method: "GET",
        });
    
        return promise;
    
      };
      this.updateProductApi =function (product){
        var promise = axios({
          url: `https://64b8c9de21b9aa6eb07a37ed.mockapi.io/api/Products/${product.id}`,
          method: "PUT",
          data:product,
        });
        return promise;
      };
    


}
