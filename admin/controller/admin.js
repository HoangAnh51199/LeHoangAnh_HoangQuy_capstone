var api = new Service();
// var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}
function getListProduct() {
  var promise = api.getListProductApi();

  promise
    .then(function (result) {
      console.log(result);
      renderUI(result.data); //gọi hàm render truyền data

    })
    .catch(function (error) {
      console.log(error);
    });


}

getListProduct();//gọi  function getlist để lấy data

function renderUI(data) { //dat bien data để truyền result vào 
  var content = "";

  for (var i = 0; i < data.length; i++) { // duyet mang 
    var product = data[i]; // data lấy noi dung doi tuong 

    //Fomart VN
    var VND = new Intl.NumberFormat('VN-vn', {
      //  style: 'currency',
      //  currency: 'VND'
    });

    content += `
          <tr>
              <td>${i + 1}</td>
              <td>${product.name}</td>
              <td>
              <div class="d-flex ">
              ${product.price}
              <span style='font: -webkit-mini-control;
              font-size: 25px;' class="ml-1">&#8363;  </span>   
              </div>
              </td>
              
              <td>${product.screen}</td>
              <td>${product.backCamera}</td>
              <td>${product.frontCamera}</td>
              <td>
                  <img src="${product.img}" width="50" />
              </td>
              <td>${product.desc}</td>
              <td>${product.type}</td>
              <td>
              <button class="btn btn-info" onclick=" editProduct(${product.id
      })"
              data-toggle="modal"
              data-target="#myModal"
              >Sửa </button>
              <button class="btn btn-danger" onclick="deleteProduct(${product.id
      })">Xoá</button>
          </td>
          </tr>
      `;
  };

  getEle("tblDanhSachSP").innerHTML = content;
}

function sort() {

  var sort = getEle("sapXepSP").value;
  console.log(sort);
  var newArray = [];
  var promise = api.getListProductApi();

  promise
    .then(function (result) {
      console.log(result);


    })
    .catch(function (error) {
      console.log(error);
    });

  console.log(promise);

  // for (var i = 0; i < listNumber.length - 1; i++) {
  //   for (var j = i + 1; j < listNumber.length; j++) {
  //     if (listNumber[i] > listNumber[j]) {
  //       // hoan vi
  //       var temp = listNumber[i];
  //       listNumber[i] = listNumber[j];
  //       listNumber[j] = temp;
  //     }
  //   }
  // }
}

function SearchProduct() {

  var txtSearch = getEle("txtSearch").value;
  console.log(txtSearch);
  var mangTimKiem = api.timKiemProductApi(txtSearch); // mảngtkiem chứa các đối tượng nv đang tìm

  renderUI(mangTimKiem);//render ra màn hình table

}

getEle("txtSearch").addEventListener("keyup", SearchProduct);

/**
* Xoa SP
*/
function deleteProduct(id) {
  var xoa = confirm("bạn có chắc muốn xóa ");
  if (xoa) {
    var promise = api.deleteProductApi(id);

    promise
      .then(function (result) {
        alert(`Delete ${result.data.name} success`);
        getListProduct();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

}

getEle("btnThemSP").onclick = function () {
  //Dom tới .modal-title thay đổi nội dung
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm SP";

  //Tạo thẻ button  "Add Product" => gắn button vào .modal-footer
  var buttonAdd = `<button class="btn btn-success" onclick="addProduct()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = buttonAdd; //[0] vitri class đầu tiên
};

/**
 * Add Product
 */
function addProduct() {
  //Dom tới các thẻ input lấy value
  var tenSP = getEle("TenSP").value;
  var giaSP = getEle("GiaSP").value;
  var manHinhSP = getEle("ManHinhSP").value;
  var cameraSau = getEle("cameraSau").value;
  var cameraTruoc = getEle("cameraTruoc").value;
  var hinhSP = getEle("HinhSP").value;
  var moTa = getEle("MoTa").value;
  var loaiSP = getEle("LoaiSP").value;

  //tạo đối tượng product từ lớp đối tượng Product
  var product = new Product("", tenSP, giaSP, manHinhSP, cameraSau, cameraTruoc, hinhSP, moTa, loaiSP);

  var promise = api.addProductApi(product);

  promise
    .then(function () {
      //re-render UI
      getListProduct();
      //close modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
