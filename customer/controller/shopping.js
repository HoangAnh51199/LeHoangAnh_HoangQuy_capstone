var cart = new Cart();
getLocalStorage();
totalQuality();
var shopping = document.querySelector(".shopping");
var close = document.querySelector(".off");
var body = document.querySelector("body");
var clear = document.querySelector(".clear");
var purchase = document.querySelector(".purchase");
var order = document.querySelector(".order");

shopping.addEventListener("click", () => {
  body.classList.add("active");
  getEle("cover").style.display = "block";
});
close.addEventListener("click", () => {
  body.classList.remove("active");
  getEle("cover").style.display = "none";
});
function getEle(id) {
  return document.getElementById(id);
}
clear.addEventListener("click", () => {
  cart.mangGioHang = [];
  renderCart(cart.mangGioHang);
  totalPrice();
  totalQuality();
  localStorage.setItem("cart", JSON.stringify(cart.mangGioHang));
});
purchase.addEventListener("click", () => {
  renderOrder(cart.mangGioHang);
  var pay = 0;
  for (var i = 0; i < cart.mangGioHang.length; i++) {
    pay += cart.mangGioHang[i].quality * cart.mangGioHang[i].price;
  }
  getEle("pay").innerHTML = pay;
  localStorage.setItem("cart", JSON.stringify(cart.mangGioHang));
});

order.addEventListener("click", () => {
  console.log(cart.mangGioHang);
  if (cart.mangGioHang.length===0) {
    alert("Vui lòng chọn sản phẩm!");
  } else{
    alert("Cám ơn bạn đã mua hàng!");
    cart.mangGioHang = [];
    renderCart(cart.mangGioHang);
    totalPrice();
    totalQuality();
    localStorage.setItem("cart", JSON.stringify(cart.mangGioHang));
  }
});

function renderCart(cart) {
  var content = "";
  for (var i = 0; i < cart.length; i++) {
    var cartItem = cart[i];
    content += `<tr style="border-bottom: 1px solid">
              <td style="padding:10px 15px">
              <img src="${cartItem.img}" style="width: 100px">
              </td>
              <td>${cartItem.name}</td>
              <td>
              <button onclick="decrease('${cartItem.id}')">-</button>
              ${cartItem.quality}
              <button onclick="increase('${cartItem.id}')">+</button>
              </td>
              <td>${cartItem.price}</td>
              <td>${cartItem.price * cartItem.quality}</td>
              <td>
                <i class="fa-solid fa-trash" onclick="xoaGH('${
                  cartItem.id
                }')" style="cursor:pointer"></i>
              </td>
          </tr>
          `;
  }
  getEle("listCard").innerHTML = content;
  totalPrice();
}
function renderOrder(cart) {
  var content = "";
  for (var i = 0; i < cart.length; i++) {
    var cartItem = cart[i];
    content += `<tr>
              <td>${cartItem.name}</td>
              <td>${cartItem.quality}</td>
              <td>${cartItem.price * cartItem.quality}</td>
          </tr>
          `;
  }
  getEle("listOrder").innerHTML = content;
}
function xoaGH(id) {
  cart.xoaGH(id);
  renderCart(cart.mangGioHang);
  totalPrice();
  totalQuality();
  localStorage.setItem("cart", JSON.stringify(cart.mangGioHang));
}
function decrease(id) {
  var index = cart.timViTri(id);
  if (cart.mangGioHang[index].quality !== 1)
    cart.mangGioHang[index].quality -= 1;
  renderCart(cart.mangGioHang);
  totalPrice();
  totalQuality();
  localStorage.setItem("cart", JSON.stringify(cart.mangGioHang));
}
function increase(id) {
  var index = cart.timViTri(id);
  cart.mangGioHang[index].quality += 1;
  renderCart(cart.mangGioHang);
  totalPrice();
  totalQuality();
  localStorage.setItem("cart", JSON.stringify(cart.mangGioHang));
}
function totalPrice() {
  var price = 0;
  for (var i = 0; i < cart.mangGioHang.length; i++) {
    price += cart.mangGioHang[i].quality * cart.mangGioHang[i].price;
  }
  getEle("total").innerHTML = price;
}
function totalQuality() {
  var quality = 0;
  for (var i = 0; i < cart.mangGioHang.length; i++) {
    quality += cart.mangGioHang[i].quality;
  }
  getEle("quality").innerHTML = quality;
}

function getLocalStorage() {
  if (localStorage.getItem("cart")) {
    var dataString = localStorage.getItem("cart");
    // convert string => JSON
    var dataJson = JSON.parse(dataString);
    cart.mangGioHang = dataJson;
    renderCart(cart.mangGioHang);
    renderOrder(cart.mangGioHang);
  }
}
