function getEle(id) {
    return document.getElementById(id);
}


function Validation() {

    this.kiemtraRong = function (value, errorId, mess) {
        if (value === "") {
            //show error
            document.getElementById(errorId).innerHTML = mess;
            document.getElementById(errorId).style.display = "block";

            return false;
        } else {
            //hide error
            document.getElementById(errorId).innerHTML = "";
            document.getElementById(errorId).style.display = "none";

            return true;
        }

    };

    this.kiemtraChucVu = function (idselect, errorId, mess) {
        var slcChucVu = document.getElementById(idselect);
        if (slcChucVu.selectedIndex !== 0) {
            //true
            document.getElementById(errorId).innerHTML = "";
            document.getElementById(errorId).style.display = "none";
            return true;
        } else {
            //false
            document.getElementById(errorId).innerHTML = mess;
            document.getElementById(errorId).style.display = "block";
            return false;

        }
    };

    this.kiemtraDodaiKyTu = function (value, errorId, mess, min, max) {
        if (min <= value.trim().length && value.trim().length <= max) { //trim() ___abc____ :chỉ lấy abc bỏ khoảng trắng
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            //false 
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }


    };

    this.kiemtraChuoiKiTu = function (value, errorId, mess) {
        var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            //
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            //false 
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
    };

    this.checkPattern = function (value, errorId, mess, letter) {
        if (value.match(letter)) {//giong var letter nhưng nhập bên main 
            //
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            //false 
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
    };

    this.kiemtraMaNVTonTai = function (value, errorId, mess, listNV) {
        var isExist = false;

        for (var i = 0; i < listNV.length; i++) { // ktra co ton tai hay ko
            var nv = listNV[i];
            if (nv.taiKhoan === value) {
                isExist = true;
                break;
            }
        }


        if (isExist) { // isexist  co ton tai  nghĩa là trùng 
            //false
            getEle(errorId).innerHTML = mess;//message
            getEle(errorId).style.display = "block";
            return false; // tra false
        } else {

            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;

        }

    };

    this.kiemtraEmailTonTai = function (value, errorId, mess, listNV) {
        var isExist = false;

        for (var i = 0; i < listNV.length; i++) { // ktra co ton tai hay ko
            var nv = listNV[i];
            if (nv.email === value) {
                isExist = true;
                break;
            }
        }


        if (isExist) { // isexist  co ton tai  nghĩa là trùng 
            //false
            getEle(errorId).innerHTML = mess;//message
            getEle(errorId).style.display = "block";
            return false; // tra false
        } else {

            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;

        }

    };

    this.kiemtraLuongVaSoGioLam = function (value, errorId, mess, min, max) {

        if (min <= value && value <= max) {
            //true
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        } else {
            //false 
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }

    };

  

}