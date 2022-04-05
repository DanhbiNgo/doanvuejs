<template>
    <div class="adminpage">
        <div class="header">
        <div class="ImgLogo"><img src="@/assets/AdminPage/img/logo.png" alt="">
        </div>
        <div class="NameLogin">Login</div>
        </div>
        <div class="container">

            <div class="leftcontainer">
                <div>
                    <div class="MenuTitle" @click='showaddproduct = !showaddproduct'>Quản Lí Sản Phẩm</div>
                    <div class="menuElm" :class="{active : showaddproduct}">
                    <div @click="addproductfn">Thêm Sản Phẩm</div>
                    <div @click="addproducttypefn">Thêm Loại Sản Phẩm</div>
                    <div @click="listproducttypefn">Danh Sách Loại Sản Phẩm</div>
                    <div @click="listproductfn">Danh Sách Sản Phẩm</div>
                    </div>
                </div>
                <div>
                    <div class="MenuTitle">Thống kê doanh thu</div>
                    <div class="menuElm">
                    <div>Doanh Thu</div>
                    <div>Thêm Loại Sản Phẩm</div>
                    </div>
                </div>
                 <div>
                    <div class="MenuTitle">Quản Lý Tài Khoản</div>
                    <div class="menuElm">
                    
                    </div>
                </div>
                <div>
                    <div class="MenuTitle">Quản Lý Đơn Hàng</div>
                    <div class="menuElm">
                   
                    </div>
                </div>
                 <div>
                    <div class="MenuTitle">Đơn Hàng Đã XL</div>
                    <div class="menuElm">
                    
                    </div>
                </div>
            </div>
            <div class="rightcontainer">
               <menu-value v-bind:Typeclass="Values"/>
            </div>
        </div>
        </div>
</template>
<script>
import MenuValue from '@/components/adminPage/MenuValue.vue'
export default {
    components:{
        MenuValue
    },
    data(){
        return{
            Values:{
                addproductType:false,
                addproduct:false,
                ListProductType:false,
                ListProduct:false
            },
            showaddproduct:false
        }
    },
    methods:{
        addproductfn(){
            this.Values.addproduct = !this.Values.addproduct;
            this.Values.addproductType = false;
            this.Values.ListProductType = false;
            this.Values.ListProduct = false;
        },
        addproducttypefn(){
            this.Values.addproduct = false ;
            this.Values.addproductType = !this.Values.addproductType;
            this.Values.ListProductType = false;
            this.Values.ListProduct = false;
        },
        listproducttypefn(){
            this.Values.addproduct = false ;
            this.Values.addproductType = false;
            this.Values.ListProductType = !this.Values.ListProductType;
            this.Values.ListProduct = false;
        },
        listproductfn(){
            this.Values.addproduct = false ;
            this.Values.addproductType = false;
            this.Values.ListProductType = false;
            this.Values.ListProduct = !this.Values.ListProduct;
        }
    },
    watch:{
       
    }
}
</script>
<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    background: black;
    padding-top:10px;
    padding-bottom: 10px;
    color:white;

}
.NameLogin{
    padding: 20px;
}
.container{
    margin-top: 10px;
    display: flex;
}
.leftcontainer{
    width: 250px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
.rightcontainer{
    margin:0 auto;
}
.menuElm{
    display: none;
}
.menuElm div{
    background:#78c0f0;
    padding: 20px;
    text-align: center;
    margin: 5px;
    cursor: pointer;
}
.MenuTitle{
    padding: 20px;
    text-align: center;
    border: 1px solid paleturquoise;
    cursor: pointer;
}
.MenuTitle:hover{
    background: #cccccc;
}
.active{
    display: block;

}

</style>