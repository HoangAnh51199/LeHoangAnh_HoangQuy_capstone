
function Cart(){
    this.mangGioHang=[];

    this.themGH=function(item){
        this.mangGioHang.push(item);
    }
    this.timViTri = function(id){
        var index=-1;
        for(var i =0;i<this.mangGioHang.length;i++){
            var item = this.mangGioHang[i];
            if(item.id===id){
                index = i;
                break;
            }
        }
        return index;
    }
    this.xoaGH=function(id){
        var index = this.timViTri(id);
        if(index!==-1){
            this.mangGioHang.splice(index,1);
        }
    }
}
