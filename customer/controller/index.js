var api = new Service();
var cart = new Cart();

function getEle(id) {
  return document.getElementById(id);
}
function getListProduct() {
  // pending
  getEle("loader").style.display = "block";
  var promise = api.getListProductApi();
  promise
    .then(function (result) {
      renderUI(result.data);
      getEle("loader").style.display = "none";
    })
    .catch(function (error) {
      console.log(error);
      getEle("loader").style.display = "none";
    });
  renderUI;
}
getListProduct();

function renderUI(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    var product = data[i];
    content += `
    <div class="col-12 col-md-6 col-lg-6">
        <div class="card card_phone">
            <img src="${product.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        <h3 class="phone-name">${product.name}</h3>
                        <p class="phone-desc">${product.desc}</p>
                    </div>
                    <div>
                        <h3 class="phone-price">${product.price}</h3>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="phone-camera">
                        <p>BC: ${product.backCamera}</p>
                        <p>FC: ${product.frontCamera}</p>
                    </div>
                    <div>
                        <p class="phone-screen">${product.screen}</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="phone-rate">
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </div>
                    <div>
                    <button onclick="themGH('${product.id}')" type="button" class="btn btn-outline-primary")">
                      <i class="fa fa-shopping-cart"></i> Buy Now
                    </button>
                    </div>
                </div>   
            </div>
        </div>
    </div>
    `;
  }
  getEle("productList").innerHTML = content;
}
function themGH(id) {
  var promise = axios({
    url: `https://64b5375cf3dbab5a95c6f319.mockapi.io/api/product/${id}`,
    method: "GET",
  });
  promise
    .then(function (result) {
      var index = cart.timViTri(id);
      if (index === -1) {
        var product = result.data;
        if (product.id === id) {
          const productId = product.id;
          const productName = product.name;
          const productImg = product.img;
          const productQuality = 1;
          const productPrice = product.price;
          const cartItem = new CartItem(
            productId,
            productName,
            productPrice,
            productImg,
            productQuality
          );
          cart.themGH(cartItem);
          renderCart(cart.mangGioHang);
          localStorage.setItem("cart", JSON.stringify(cart.mangGioHang));
        }
      }else{
        cart.mangGioHang[index].quality+=1;
        renderCart(cart.mangGioHang);
        localStorage.setItem("cart", JSON.stringify(cart.mangGioHang));
      }
      totalPrice();
      totalQuality();
    })
    .catch(function (error) {
      console.log(error);
    });
  // renderUI;
  
}

function chooseType() {
  var search = getEle("client").value;
  // console.log(search);

  var promise = api.getListProductApi();
  promise
    .then(function (result) {
      var productList = [];
      for (var i = 0; i < result.data.length; i++) {
        if (result.data[i].type === search) {
          productList.push(result.data[i]);
          renderUI(productList);
        } else if (search === "Chọn loại sản phẩm") {
          productList.push(result.data[i]);
          renderUI(productList);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
