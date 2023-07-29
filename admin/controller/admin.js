var api = new Service();
var validation = new Validation();

function getEle(id) {
  return document.getElementById(id);
}

let arrApi = []; // mang rong


function getListProduct() {
  getEle("loader").style.display = "block";
  var promise = api.getListProductApi();

  return promise.then(function (result) {
    getEle("loader").style.display = "none";
    renderUI(result.data);
    return result.data;
  }).catch(function (error) {
    console.log(error);
    throw error; // Tái ném lỗi để giữ lại lỗi trong Promise
  });
}

getListProduct()
  .then((res) => {
  })


function renderUI(data) {
  //dat bien data để truyền result vào
  var content = "";

  for (var i = 0; i < data.length; i++) {
    // duyet mang
    var product = data[i]; // data lấy noi dung doi tuong

    //Fomart VN
    var VND = new Intl.NumberFormat("VN-vn", {
      //  style: 'currency',
      //  currency: 'VND'
    });

    content += `
          <tr>
              <td>${i + 1}</td>
              <td>${product.name}</td>
              <td>
              <div class="d-flex ">
              ${VND.format(product.price)}
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
              <button class="btn btn-info" onclick=" editProduct(${product.id})"
              data-toggle="modal"
              data-target="#myModal"
              >Sửa </button>
              <button class="btn btn-danger" onclick="deleteProduct(${product.id
      })">Xoá</button>
          </td>
          </tr>
      `;
  }

  getEle("tblDanhSachSP").innerHTML = content;
}

//console.log(arrApi);
//console.log(arrApi.length);

let searchResults = [];

// getEle(sapXepSP).addEventListener

document.getElementById("sapXepSP").addEventListener("change", function () {
  console.log(searchProduct().length);
  var sort = getEle("sapXepSP").value;
  if (searchResults.length > 0) {  //searchProduct.length (==2 ) tham số data ,sort ko phải return array
    let sortedData = sapXep(searchResults, sort);
    renderUI(sortedData);
  } else {
    // Nếu chưa tìm kiếm, lấy dữ liệu mới và sắp xếp
    getListProduct()
      .then((res) => {
        let sortedData = sapXep(res, sort);
        renderUI(sortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});



function sapXep(data, sort) {
  let sortedData = [...data]; // Tạo một bản sao của mảng data để không ảnh hưởng đến dữ liệu ban đầu
  console.log(sortedData);
  if (sort === "sortMintoMax") {
    sortedData.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (sort === "sortMaxtoMin") {
    sortedData.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  return sortedData;
}




//var arrsapXep = sapXep();
//console.log(arrsapXep);

// console.log(arrApi);


document.getElementById("txtSearch").addEventListener('keyup', handleSearch)


function searchProduct(keyword, data) {
  var searchResults = [];
  if(keyword){
    keyword = keyword.toLowerCase();
  

    for (var i = 0; i < data.length; i++) {
      var product = data[i];
      if (product.name.toLowerCase().includes(keyword)) {
        searchResults.push(product);
      }
    }
  
    console.log(searchResults);
  }
 
  return searchResults;
}


function handleSearch() {
  var txtSearch = getEle("txtSearch").value;

  getListProduct()
    .then((res) => {
      if (txtSearch !== "") {
        // Nếu có từ khóa tìm kiếm, lọc dữ liệu và hiển thị kết quả tìm kiếm
        searchResults = searchProduct(txtSearch, res);
        let sort = getEle("sapXepSP").value;
        let sortedData = sapXep(searchResults, sort);
        renderUI(sortedData);
      } else {
        // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ dữ liệu
        searchResults = [];
        let sort = getEle("sapXepSP").value;
        let sortedData = sapXep(res, sort);
        renderUI(sortedData);
      }
    })
    .catch((err) => {
      console.log(err);
    });






}


//getEle("txtSearch").addEventListener("keyup", SearchProduct(arrApi));

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
  }
}

getEle("btnThemSP").onclick = function () {
  //Dom tới .modal-title thay đổi nội dung
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm SP";

  //Tạo thẻ button  "Add Product" => gắn button vào .modal-footer
  var buttonAdd = `<button class="btn btn-success" onclick="addProduct(true)">Add</button>`;

  var buttonclose = '<button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>';
  document.getElementsByClassName("modal-footer")[0].innerHTML = buttonAdd + buttonclose; //[0] vitri class đầu tiên
  //document.getElementsByClassName("modal-footer")[0].innerHTML = buttonclose;
  console.log(123);
  getEle("formNhap").reset();//reset form về ban đầu trống input
  getEle("TenSP").disabled = false;

  getEle("txtErrorTenSP").style.display = "none";
  getEle("txtErrorGiaSP").style.display = "none";
  getEle("txtErrorManSP").style.display = "none";
  getEle("txtErrorCameraBehind").style.display = "none";
  getEle("txtErrorCameraFront").style.display = "none";
  getEle("txtErrorImg").style.display = "none";
  getEle("txtErrorDes").style.display = "none";
  getEle("txtErrorType").style.display = "none";
};


function layThongTin(event) { //onkeyup,onchange
  var inputElement = event.target;
  var inputValue = inputElement.value;
  console.log(inputValue);
  console.log(inputElement);
  console.log(inputElement.id);
  /**
      * Dom lay thong tin tu cac the input
      */
  var tenSP = getEle("TenSP").value;
  var giaSP = getEle("GiaSP").value;
  var manHinhSP = getEle("ManHinhSP").value;
  var cameraSau = getEle("cameraSau").value;
  var cameraTruoc = getEle("cameraTruoc").value;
  var hinhSP = getEle("HinhSP").value;
  var moTa = getEle("MoTa").value;
  var loaiSP = getEle("LoaiSP").value;


  switch (inputElement.id) {
    case 'TenSP':
      getListProduct()
      .then((res) => {
        validation.kiemtraRong(tenSP, "txtErrorTenSP", "(*) vui lòng không để trống ")
        &&
        validation.kiemtraTenSpTonTai(
          tenSP,
          "txtErrorTenSP",
          "(*) tên sản phẩm đã tồn tại",
          res
           // biến list 
        ) && validation.kiemtraDodaiKyTu(
          tenSP,
          "txtErrorTenSP",
          "(*) vui long nhap tu 4-12 ký tự ",
          4,
          12
        );
      })
     
      break;

    case 'GiaSP':

      validation.kiemtraRong(giaSP, "txtErrorGiaSP", "(*) vui lòng không để trống ")
        &&
        validation.checkPattern(
          giaSP,
          "txtErrorGiaSP",
          "(*) chỉ được nhập số number  ",
          /^\d+$/

        );
      break;

    case 'ManHinhSP':
      validation.kiemtraRong(manHinhSP, "txtErrorManSP", "(*) vui lòng không để trống ");
      break;

    case 'cameraSau':
      validation.kiemtraRong(cameraSau, "txtErrorCameraBehind", "(*) vui lòng không để trống ");
      break;

    case 'cameraTruoc':
      validation.kiemtraRong(cameraTruoc, "txtErrorCameraFront", "(*) vui lòng không để trống ");

      break;

    case 'HinhSP':
      validation.kiemtraRong(hinhSP, "txtErrorImg", "(*) vui lòng không để trống ")
        &&
        validation.checkPattern(
          hinhSP,
          "txtErrorImg",
          "(*) chỉ được nhập url  ",
          /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

        );

      break;

    case 'MoTa':
      validation.kiemtraRong(moTa, "txtErrorDes", "(*) vui lòng không để trống ");
      break;

    case 'LoaiSP':
      validation.kiemtraRong(loaiSP, "txtErrorType", "(*) vui lòng không để trống ");
      break;

  }
}




/**
 * Add Product
 */
function addProduct(isADD) {

  //Dom tới các thẻ input lấy value

  var tenSP = getEle("TenSP").value;
  var giaSP = getEle("GiaSP").value;
  var manHinhSP = getEle("ManHinhSP").value;
  var cameraSau = getEle("cameraSau").value;
  var cameraTruoc = getEle("cameraTruoc").value;
  var hinhSP = getEle("HinhSP").value;
  var moTa = getEle("MoTa").value;
  var loaiSP = getEle("LoaiSP").value;


  // if (isADDTK) {//ktra bien isADD true làm trong {} ,false bỏ qua
  //   //validation taiKhoan

  getListProduct()
        .then((res) => {
        
          var isvalid = true;
  if (isADD) {
    isvalid &= validation.kiemtraRong(tenSP, "txtErrorTenSP", "(*) vui lòng không để trống ")
      &&
      validation.kiemtraTenSpTonTai(
        tenSP,
        "txtErrorTenSP",
        "(*) tên sản phẩm đã tồn tại",
        res
        // biến list 
      ) && validation.kiemtraDodaiKyTu(
        tenSP,
        "txtErrorTenSP",
        "(*) vui long nhap tu 4-12 ký tự ",
        4,
        12
      )
  };


  isvalid &= validation.kiemtraRong(giaSP, "txtErrorGiaSP", "(*) vui lòng không để trống ")
    &&
    validation.checkPattern(
      giaSP,
      "txtErrorGiaSP",
      "(*) chỉ được nhập số number  ",
      /^\d+$/

    );

  isvalid &= validation.kiemtraRong(manHinhSP, "txtErrorManSP", "(*) vui lòng không để trống ");

  isvalid &= validation.kiemtraRong(cameraSau, "txtErrorCameraBehind", "(*) vui lòng không để trống ");
  isvalid &= validation.kiemtraRong(cameraTruoc, "txtErrorCameraFront", "(*) vui lòng không để trống ");
  isvalid &= validation.kiemtraRong(hinhSP, "txtErrorImg", "(*) vui lòng không để trống ")
    &&
    validation.checkPattern(
      hinhSP,
      "txtErrorImg",
      "(*) chỉ được nhập url  ",
      /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

    );
  isvalid &= validation.kiemtraRong(moTa, "txtErrorDes", "(*) vui lòng không để trống ");
  isvalid &= validation.kiemtraRong(loaiSP, "txtErrorType", "(*) vui lòng không để trống ");

  if (isvalid) {

    //tạo đối tượng product từ lớp đối tượng Product
    var product = new Product(
      "",
      tenSP,
      giaSP,
      manHinhSP,
      cameraSau,
      cameraTruoc,
      hinhSP,
      moTa,
      loaiSP
    );



    var promise = api.addProductApi(product); //truyen bien product

    promise
      .then(function () {
        getListProduct();
        //close modal
        alert("thêm " + tenSP + " thành công");
        document.getElementsByClassName("close")[0].click();

        //re-render UI
        getListProduct();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return null;
})


  
}

function editProduct(id) {
  //dom tới .modal-title thay đối nội dung

  document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa SP";

  //Tạo thẻ button  "Update Product" => gắn button vào .modal-footer
  var buttonclose = '<button id="btnDong" type="button" class="btn btn-danger" data-dismiss="modal">Đóng</button>';
  var buttonUpdate = `<button class="btn btn-success" onclick="updateProduct(${id},false)" > Update </button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = buttonUpdate + buttonclose;
  console.log(id);

  api
    .getProductById(id)
    .then(function (result) {
      console.log(result.data); //show data ra các thẻ input
      //Dom tới các thẻ input lấy value
      getEle("TenSP").value = result.data.name;
      getEle("TenSP").disabled = true;
      getEle("GiaSP").value = result.data.price;
      getEle("ManHinhSP").value = result.data.screen;
      getEle("cameraSau").value = result.data.backCamera;
      getEle("cameraTruoc").value = result.data.frontCamera;
      getEle("HinhSP").value = result.data.img;
      getEle("MoTa").value = result.data.desc;
      getEle("LoaiSP").value = result.data.type;
    })
    .catch(function (error) {
      console.log(error);
    });
}

//update product
function updateProduct(id, isADD) {
  //dom tới thẻ input lấy value
  //Dom tới các thẻ input lấy value
  var tenSP = getEle("TenSP").value;
  var giaSP = getEle("GiaSP").value;
  var manHinhSP = getEle("ManHinhSP").value;
  var cameraSau = getEle("cameraSau").value;
  var cameraTruoc = getEle("cameraTruoc").value;
  var hinhSP = getEle("HinhSP").value;
  var moTa = getEle("MoTa").value;
  var loaiSP = getEle("LoaiSP").value;
  var isvalid = true;

  if (isADD) {
    isvalid &= validation.kiemtraRong(tenSP, "txtErrorTenSP", "(*) vui lòng không để trống ")
      &&
      validation.kiemtraTenSpTonTai(
        tenSP,
        "txtErrorTenSP",
        "(*) tên sản phẩm đã tồn tại",
        // biến list 
      ) && validation.kiemtraDodaiKyTu(
        tenSP,
        "txtErrorTenSP",
        "(*) vui long nhap tu 4-12 ký tự ",
        4,
        12
      );
  }


  isvalid &= validation.kiemtraRong(giaSP, "txtErrorGiaSP", "(*) vui lòng không để trống ")
    &&
    validation.checkPattern(
      giaSP,
      "txtErrorGiaSP",
      "(*) chỉ được nhập số number  ",
      /^\d+$/

    );

  isvalid &= validation.kiemtraRong(manHinhSP, "txtErrorManSP", "(*) vui lòng không để trống ");

  isvalid &= validation.kiemtraRong(cameraSau, "txtErrorCameraBehind", "(*) vui lòng không để trống ");
  isvalid &= validation.kiemtraRong(cameraTruoc, "txtErrorCameraFront", "(*) vui lòng không để trống ");
  isvalid &= validation.kiemtraRong(hinhSP, "txtErrorImg", "(*) vui lòng không để trống ")
    &&
    validation.checkPattern(
      hinhSP,
      "txtErrorImg",
      "(*) chỉ được nhập url  ",
      /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

    );
  isvalid &= validation.kiemtraRong(moTa, "txtErrorDes", "(*) vui lòng không để trống ");
  isvalid &= validation.kiemtraRong(loaiSP, "txtErrorType", "(*) vui lòng không để trống ");




  //}

  if (isvalid) {

    //tạo đối tượng product
    var product = new Product(
      id,
      tenSP,
      giaSP,
      manHinhSP,
      cameraSau,
      cameraTruoc,
      hinhSP,
      moTa,
      loaiSP
    );
    //gui product moi sua len api
    console.log(product);

    api
      .updateProductApi(product)
      .then(function () {
        //close modal
        getListProduct();
        document.getElementsByClassName("close")[0].click();
        alert("cập nhật thành công: " + tenSP);
        //render list procduct
        getListProduct();
        //window.location.reload();

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return null;
}

