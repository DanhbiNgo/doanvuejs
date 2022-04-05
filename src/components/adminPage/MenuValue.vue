<template>
    <div>
        <div v-if="Typeclass.addproductType" class="addProductType">
            <form @submit.prevent="sendaddProductType()">
                <div>
                    <div>Tên Sản Loại Sản phẩm</div>
                    <input type="text" name="" v-model="addProductTypeValues.l_ten">
                </div>
                <div>
                    <div>Hình Ảnh Loại Sản phẩm</div>
                    <div @click="OpenFile()">Chọn File</div>
                    <input type="file" name="file" id="file" ref="selectFile" style="display:none" v-on:change="onChangeFileUpload()" >
                </div>
                <div>
                    <button type="submit">Thêm</button>
                </div>
            </form>
        </div>
        <div v-if="Typeclass.addproduct" class="addProduct">
           <form action="" @submit.prevent="sendAddProduct">
               <div>
                   <div>
                       Tên Sản phẩm
                   </div>
                   <div>
                       <input type="text" v-model="addProductValues.sp_ten">
                   </div>
               </div>
               <div>
                   <div>
                      Hình Ảnh
                   </div>
                   <div>
                       <div @click="this.$refs.productImg.click()">Thêm Hình Ảnh</div>
                       <input type="file" style="display:none" ref="productImg" multiple="multiple" @change="MtImage">
                   </div>
               </div>
               <div>
                   <div>
                       Giá Gốc Sản Phẩm
                   </div>
                   <div>
                       <input type="text" v-model="addProductValues.sp_giagoc">
                   </div>
               </div>
               <div>
                   <div>
                       Giá bán Sản Phẩm
                   </div>
                   <div>
                       <input type="text"  v-model="addProductValues.sp_giaban">
                   </div>
               </div>
               <div>
                   <div>
                       Thông Tin Sản Phẩm
                   </div>
                   <div>
                       <textarea name="" id="" cols="30" rows="10"  v-model="addProductValues.sp_thongtin"></textarea>
                   </div>
               </div>
               <div>
                   <div>
                      Sản Phẩm Số Lượng
                   </div>
                   <div>
                       <input type="text" v-model="addProductValues.sp_soluong">
                   </div>
               </div>
               <div>
                   <div>
                      Sản Phẩm kích thước
                   </div>
                   <div>
                       <input type="text" v-model="addProductValues.sp_kichthuoc">
                   </div>
               </div>
               <div>
                   <div>
                      Sản Phẩm Thuộc Loại
                   </div>
                   <div >
                      <select name="" id="" v-model="addProductValues.l_ma">
                          <option disabled value="">Chọn Loại Sản Phẩm</option>
                          <option v-for="(gettoProducttype,index) in getProductTypeRps" :key="index"  v-bind:value="gettoProducttype.l_ma">{{gettoProducttype.l_ten}}</option>
                      </select>
                   </div>
               </div>
               <div>
                   <button>Thêm</button>
               </div>
           </form>
        </div>
        <div class="listproductTypes" v-if="Typeclass.ListProductType">
            <div class="menuListPd">
                <div>Tên Loại</div>
                <div>Hình ảnh</div>
                <div>Sửa</div>
                <div>Xóa</div>
            </div>
            <div v-for="(listproduct,index) in getProductTypeRps" :key='index' class="listproductType">
                <div>{{listproduct.l_ten}}</div>
                <div><img v-bind:src="hostServer + listproduct.Img"/></div>
                 <div><a href="javascript::"><span class="material-icons-outlined">edit</span></a></div>
                <div><a href="javascript::"><span class="material-icons-outlined" @click="deleteProductType(listproduct.l_ma)">delete</span></a></div>
            </div> 
        </div>
        <div class="listproducts" v-if="Typeclass.ListProduct">
            <div class="menuListProduct">
                <div>Tên Sản Phẩm</div>
                <div>Hình ảnh</div>
                <div>Sửa</div>
                <div>Xóa</div>
            </div>
            <div v-for="(listproduct,index) in getProductRps.data" :key='index' class="listproduct">
                <div>{{listproduct.sp_ten}}</div>
                <div class="imgProducts">
                <div v-for="(imgproduct,index) in getImgProduct" :key='index' class="imgProduct">
                    <img v-bind:src="hostServer + imgproduct.hinhanh" v-if="imgproduct.sp_ma == listproduct.sp_ma "/>
                </div>
                </div>
                 <div><a href="javascript::"><span class="material-icons-outlined">edit</span></a></div>
                <div><a href="javascript::"><span class="material-icons-outlined" @click="deleteProduct(listproduct.sp_ma)">delete</span></a></div>
            </div>
            <div class="paginate">
                
                <div><a href="javascript::" @click="current_page--" v-if="current_page > 1">Trước</a></div>
                <div v-if="current_page > min_page && current_page >= 4"><a href="javascript::" @click="current_page = 1">1</a></div>
                <div v-if="current_page > min_page && current_page >= 5">...</div>
                <div v-for="(Page,index) in last_page" :key='index' :class="{ClassNull: index+1 > this.max_page || index+1 < this.min_page}"><a href="javascript::" @click="current_page = Page" :class="{active: current_page == Page}" v-if="Page >= min_page && Page <= max_page">{{Page}}</a></div>
                <div v-if="current_page < last_page && current_page <= last_page -4">...</div>
                <div  v-if="current_page < last_page && current_page <= last_page -4"><a href="javascript::" @click="current_page = last_page">{{last_page}}</a></div>
                <div><a href="javascript::" @click="current_page++" v-if="current_page < last_page">Sau</a></div>
                
            </div>

        </div>
    </div>
</template>
<script>
const axios = require('axios');
export default {
    props:{
        Typeclass:Object
    },
    data(){
        return{
            hostServer:'https://webapi-banhang.000webhostapp.com/',
            ProductTypeRps:{},
            addProductTypeValues:{
                l_ten:'',
                Img:''
            },
            addProductValues:{
                sp_ten:'',
                sp_giagoc:'',
                sp_giaban:'',
                sp_thongtin:'',
                sp_soluong:'',
                sp_kichthuoc:'',
                l_ma:''

            },
            getProductTypeRps:'',
            getProductRps:'',
            getImgProduct:'',
            current_page:0,
            last_page:0,
            min_page:1,
            max_page:5,
        }
    },
    watch: {
       'Typeclass.ListProduct'(value){
         if(value==true){
                axios.get(this.hostServer+'api/GetProduct/0')
           .then(response=>{
              this.getProductRps = response.data.dataProduct;
              this.getImgProduct = response.data.dataImg;
              this.current_page = response.data.dataProduct.current_page;
              this.last_page = response.data.dataProduct.last_page;
              //console.log(this.last_page);
          })
           .catch(error=>{
               this.errors = error.response.data.errors;
              this.errorlogin= error.response.status;
              console.log(error.response.data);
           })
         }
       },
       current_page(value){
           axios.get(this.hostServer+'api/GetProduct/0?page='+ value)
           .then(response=>{
              this.getProductRps = response.data.dataProduct;
              this.getImgProduct = response.data.dataImg;
              console.log(this.getProductRps);
          })
           .catch(error=>{
               this.errors = error.response.data.errors;
              this.errorlogin= error.response.status;
              console.log(error.response.data);
           })

            this.max_page = value + 2;
            this.min_page = value - 2;
            if(value >= this.last_page || this.max_page > this.last_page){
                this.max_page = this.last_page;
                this.min_page = this.last_page -4;
            }
            /*if(this.min_page <= 1){
                this.max_page = value + 3;
                this.min_page = 1;
            }*/
            if(value == 1 || value == 2){
                this.max_page = 5;
                this.min_page = 1;
            }
            console.log(this.max_page);
            console.log(this.min_page);
       }
    }
    ,
    mounted(){
        this.getProductType();
    },
    methods:{
        OpenFile: function(){
            this.$refs.selectFile.click();
        },
        sendaddProductType: function(){
             let formData = new FormData();
            formData.append('Img', this.addProductTypeValues.Img);
            formData.append('l_ten', this.addProductTypeValues.l_ten);
        axios.post(this.hostServer + 'api/addProductType',
              formData)
          .then(response=>{
              this.ProductTypeRps = response.data;
          })
          .catch(error =>{
              this.errors = error.response.data.errors;
              this.errorlogin= error.response.status;
              console.log(error.response.data);
            
          });
        },
         onChangeFileUpload(){
            this.addProductTypeValues.Img = this.$refs.selectFile.files[0];
      },
      getProductType(){
           axios.get(this.hostServer+'api/getProductType/all')
           .then(response=>{
              this.getProductTypeRps = response.data;
              console.log(response.data);
          })
           .catch(error=>{
               this.errors = error.response.data.errors;
              this.errorlogin= error.response.status;
              console.log(error.response.data);
           })
      },
      sendAddProduct(){
           let formData = new FormData();
          var imgfiles = this.$refs.productImg.files;
          for( var i = 0; i < imgfiles.length; i++ ){
                let file = imgfiles[i];
                console.log(file);
                formData.append('img_files[' + i + ']', file);
            }
        formData.append('sp_ten', this.addProductValues.sp_ten);
        formData.append('sp_giagoc', this.addProductValues.sp_giagoc);
        formData.append('sp_giaban', this.addProductValues.sp_giaban);
        formData.append('sp_thongtin', this.addProductValues.sp_thongtin);
        formData.append('sp_soluong', this.addProductValues.sp_soluong);
        formData.append('sp_kichthuoc', this.addProductValues.sp_kichthuoc);
        formData.append('l_ma', this.addProductValues.l_ma);


             axios.post(this.hostServer + 'api/addProduct',formData)
           .then(response=>{
              this.getProductTypeRps = response.data;
               this.getProductType();
          })
           .catch(error=>{
               this.errors = error.response.data.errors;
              this.errorlogin= error.response.status;
              console.log(error.response.data);
           })

        },
        deleteProduct(sp_ma){
            axios.get(this.hostServer+'api/DeleteProduct/'+sp_ma)
           .then(response=>{
                axios.get(this.hostServer+'api/GetProduct/0')
           .then(response=>{
              this.getProductRps = response.data.dataProduct;
              this.getImgProduct = response.data.dataImg;
              this.current_page = response.data.dataProduct.current_page;
              this.last_page = response.data.dataProduct.last_page;
              //console.log(this.last_page);
          })
           .catch(error=>{
               this.errors = error.response.data.errors;
              this.errorlogin= error.response.status;
              console.log(error.response.data);
           })
              console.log(response.data);
          })
           .catch(error=>{
               this.errors = error.response.data.errors;
              this.errorlogin= error.response.status;
              console.log(error.response.data);
           })
        },
        deleteProductType(l_ma){
            axios.get(this.hostServer+'api/DeleteProductType/'+l_ma)
           .then(response=>{
               this.getProductType();
              console.log(response.data);
          })
           .catch(error=>{
               this.errors = error.response.data.errors;
              this.errorlogin= error.response.status;
              console.log(error.response.data);
           })
        }
        
    }
}
</script>
<style scoped>
.listproductTypes{
    display: flex;
    flex-direction: column;
    padding: 20px;
}
.listproductTypes .listproductType{
    display: flex;
     align-items: center;
}
.listproductTypes .listproductType div{
    width: 200px;
}
.listproductTypes .listproductType img{
    width: 100px;
}
.menuListPd {
 display: flex;
 align-items: center;
}
.menuListPd  div{
 width: 200px;
}
.menuListProduct{
    display: flex;
    align-items: center;
}
.menuListProduct div{
   width:200px;
}
.listproduct{
    display: flex;
    align-items: center;
}
.listproduct div{
    width: 200px;
}
.imgProducts img{
width: 100px;
object-fit: cover;
}
.active{
    background: lightskyblue;
    display: block;
}
.paginate{
    display: flex;
    width: 100%;
    justify-items: center;
    justify-content: center;
    bottom: 5px;
    position: relative;
}
.paginate div{
    width: 50px;
    text-align: center;
}
.paginate div a{
text-decoration: none;
width: 50px;
color: black;
text-align: center;
 display: block;
}
.ClassNull{
    display: none;
}

</style>