var api = new Service();
// var validation = new Validation();






function getEle(id) {
  return document.getElementById(id);
}



let arrApi = []; // mang rong

function getListProduct() {
  var promise = api.getListProductApi();
  promise
    .then(function (result) {
      //console.log(result);
      renderUI(result.data); //gọi hàm render truyền data(biendata=result)) , .data lay phan data api thoi.


      for (var i = 0; i < result.data.length; i++) {
        arrApi.push(result.data[i]);
      }
      console.log(arrApi);

      return arrApi; //lấy arr từ promise

    })

    .catch(function (error) {
      console.log(error);

    });
}

getListProduct();//gọi  function getlist để lấy dataz


//  async function getJSONAsync() {

//   // The await keyword saves us from having to write a .then() block.
//    let json = await axios.get('https://64b8c9de21b9aa6eb07a37ed.mockapi.io/api/Products');

//    //The result of the GET request is available in the json variable.
//       //  return it just like in a regular synchronous function.
//    return json;
// }
// //async giong promise

//  getJSONAsync()
//  .then(function (result) {
//    // Do something with result.
//    console.log(result.data);
//    renderUI(result.data);
//    for (var i = 0; i < result.data.length; i++) {
//     arrApi.push(result.data[i]);
//    console.log(arrApi);
//    return arrApi;
//    }
//})

//.catch(function (error) {
//console.log(error);

//});




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

//console.log(arrApi);
//console.log(arrApi.length);



let arrsapXep = [];

function sapXep() {

  var sort = getEle("sapXepSP").value;
  // console.log(arrApi);

  let clonedArrApi = [...arrApi];
  console.log(clonedArrApi);
  //console.log('sapxep-arraylenght:', arrdemo.length);

  if (sort === "sortMintoMax") {

    //zconsole.log(data);

    for (var i = 0; i < clonedArrApi.length - 1; i++) {//bat dau tu dau mang

      for (var j = i + 1; j < clonedArrApi.length; j++) {

        if (clonedArrApi[i].price > clonedArrApi[j].price) {// so sánh giá tiên

          // hoan vi
          var temp = clonedArrApi[i]; //vd :temp chua doi tuong tạm thời
          clonedArrApi[i] = clonedArrApi[j];//price 3>1 đổi chỗ vi trí [i] cho [j] vitri [i] chứa data[j]
          clonedArrApi[j] = temp;//data.[j]  chứa nội dung vitri [i]

        }
      }
    };

    renderUI(clonedArrApi);


    for (var z = 0; z < clonedArrApi.length; z++) {
      arrsapXep.push(clonedArrApi[z]);
    }


    console.log(arrsapXep);
    return arrsapXep;


  } else if (sort === "sortMaxtoMin") {
    for (var i = 0; i < clonedArrApi.length - 1; i++) {//bat dau tu dau mang

      for (var j = i + 1; j < clonedArrApi.length; j++) {

        if (clonedArrApi[i].price < clonedArrApi[j].price) {// so sánh giá tiên

          //     // hoan vi
          var temp = clonedArrApi[i]; //vd :temp chua doi tuong tạm thời
          clonedArrApi[i] = clonedArrApi[j];//price 3>1 đổi chỗ vi trí [i] cho [j] vitri [i] chứa data[j]
          clonedArrApi[j] = temp;//data.[j]  chứa nội dung vitri [i]
        }
      }
    };

    renderUI(clonedArrApi);

    for (var z = 0; z < clonedArrApi.length; z++) {
      arrsapXep.push(clonedArrApi[z]);
    }


    console.log(arrsapXep);
    return arrsapXep;
  }
}



//var arrsapXep = sapXep();
//console.log(arrsapXep);




console.log(arrApi);
function SearchProduct() {

  var txtSearch = getEle("txtSearch").value;
  console.log(txtSearch);
  var mangTimKiem = []; //mảng rỗng
  console.log(arrApi);
  var sort = arrsapXep;
  //console.log(sort);

  if (sort.length > 0) {
   //console.log(123);
    for (var i = 0; i < sort.length; i++) {//duyet result
      var product = sort[i]; // 1  doi tuong
      var keywordLowercase = txtSearch.toLowerCase();
      var namePDLowerCase = product.name.toLowerCase();
      console.log(product);

     if (namePDLowerCase.indexOf(keywordLowercase) !== -1) {
         mangTimKiem.push(product); //push data product vào mảng
      }
     }
    // console.log(mangTimKiem);
     renderUI(mangTimKiem);//render ra màn hình table

  } else if(sort.length === 0){

    //console.log(234);
    for (var i = 0; i < arrApi.length; i++) {//duyet result
      var product = arrApi[i]; // 1  doi tuong
      var keywordLowercase = txtSearch.toLowerCase();
      var namePDLowerCase = product.name.toLowerCase();
      console.log(product);

      if (namePDLowerCase.indexOf(keywordLowercase) !== -1) {
        mangTimKiem.push(product); //push data product vào mảng
      }
    }
    //console.log('mangTimKiem', mangTimKiem);

    renderUI(mangTimKiem);//render ra màn hình table


 }

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

  var promise = api.addProductApi(product);//truyen bien product

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

function editProduct(id) {
  //dom tới .modal-title thay đối nội dung 

  document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa SP";

  //Tạo thẻ button  "Update Product" => gắn button vào .modal-footer
  var buttonUpdate = `<button class="btn btn-success" onclick="updateProduct(${id})" > Update </button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = buttonUpdate;
  console.log(id);


  api
    .getProductById(id)
    .then(function (result) {
      console.log(result.data);//show data ra các thẻ input 
      //Dom tới các thẻ input lấy value
      getEle("TenSP").value = result.data.name;
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
function updateProduct(id) {
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


  //tạo đối tượng product
  var product = new Product(id, tenSP, giaSP, manHinhSP, cameraSau, cameraTruoc, hinhSP, moTa, loaiSP);
  //gui product moi sua len api
  console.log(product);

  api.updateProductApi(product)
    .then(function () {
      //close modal 
      //close modal
      document.getElementsByClassName("close")[0].click();
      //render list procduct
      getListProduct();


    })
    .catch(function (error) {
      console.log(error);
    });
}
