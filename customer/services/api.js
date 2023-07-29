function Service() {
  this.getListProductApi = function () {
    var promise = axios({
      url: "https://64b5375cf3dbab5a95c6f319.mockapi.io/api/product",
      method: "GET",
    });
    return promise;
  };
}
