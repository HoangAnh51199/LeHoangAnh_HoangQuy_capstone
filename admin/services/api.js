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

    this.timKiemProductApi = function (keyword) {
        var promise = axios({
            url: "https://64b8c9de21b9aa6eb07a37ed.mockapi.io/api/Products",
            method: "GET",
        });

        promise
        

            .then(function (result) {
                

                var mangTimKiem = []; //rỗng
                for (var i = 0; i < result.data.length; i++) {
                    var product = result.data[i]; //bien nv chua  từng chữ duyệt mảng
                    var keywordLowercase = keyword.toLowerCase();
                    var namePDLowerCase = product.name.toLowerCase();
                    console.log(product);
                    if (namePDLowerCase.indexOf(keywordLowercase) !== -1) {
                        mangTimKiem.push(product); //push data product vào mảng
                    }
                }
                console.log('mangTimKiem',mangTimKiem);
                
                return mangTimKiem;


            })
            .catch(function (error) {
                console.log(error);
            });


    };

    this.deleteProductApi = function (id) {
        var promise = axios({
          url: `https://64b8c9de21b9aa6eb07a37ed.mockapi.io/api/Products/${id}`,
          method: "DELETE",
        });
    
        return promise;
      };

      this.addProductApi = function (product) {
        var promise = axios({
          url: "https://64b8c9de21b9aa6eb07a37ed.mockapi.io/api/Products",
          method: "POST",
          data: product,
        });
    
        return promise;
      };



}
