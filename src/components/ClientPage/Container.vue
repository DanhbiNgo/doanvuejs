<template>
    <div class="container">
        <div class="Products">
            <div class="Product" v-for="(product,index) in ProductRps.data" :key="index">
                    <div class="imgProduct" v-for="(productImg,index) in ProductImg" :key="index">
                        <img :src="'https://webapi-banhang.000webhostapp.com/'+productImg.hinhanh" alt="" v-if="product.sp_ma == productImg.sp_ma">
                    </div>
                    <div class="Product_name">
                    <div>{{product.sp_ten}}</div>
                    <div>{{$filters.capitalize(product.sp_giaban)}}</div>
                    </div>
                    <div class="Product_button">
                        <button>Thêm</button>
                        <button>Mua Ngay</button>
                    </div>
            </div>
        </div>
        <div class="paginate">
            <div @click="current_page-- " v-if="current_page > 1" style="width: 50px;text-align: center;">Trước</div>
            <div v-if="current_page >= 4 && min_page != 0" @click="current_page = 1">1</div>
            <div v-if="current_page >= 5">...</div>
            <div v-for="(Page,index) in last_page" :key="index" :class="{NonClass: index+1 < min_page || index > max_page-1}">
                <a href="javascript::" :class="{active:current_page == Page}" @click="current_page = Page" v-if="Page >= min_page && Page <=max_page ">{{Page}}</a>
            </div>
            <div v-if="current_page <= last_page-4">...</div>
            <div v-if="current_page <= last_page-3 && last_page >= 5" @click="current_page = last_page">{{last_page}}</div>
            <div @click="current_page++" v-if="current_page < last_page">Sau</div>
        </div>
    </div>
</template>
<script>
const axios = require('axios');
export default {
    props:['idProductT']
    ,
    data(){
        return{
            hostServer:'https://webapi-banhang.000webhostapp.com/',
            ProductRps:'',
            ProductImg:'',
            current_page:0,
            last_page:0,
            max_page:5,
            min_page:1
        }
    },
    created(){
         
    },
    watch:{
        idProductT(value){
             axios.get(this.hostServer+'api/GetProduct/'+ value)
           .then(response=>{
               this.ProductRps = response.data.dataProduct;
               this.ProductImg = response.data.dataImg;
               this.current_page = response.data.dataProduct.current_page;
               this.last_page = response.data.dataProduct.last_page;
              //console.log( this.current_page);
          })
           .catch(error=>{
               this.errors = error.response.data.errors;
              this.errorlogin= error.response.status;
              console.log(error.response.data);
           })
        },
        current_page(value){
              axios.get(this.ProductRps.path + '?page='+value)
           .then(response=>{
               this.ProductRps = response.data.dataProduct;
               this.ProductImg = response.data.dataImg;
               //this.last_page = response.data.dataProduct.last_page;
              //console.log( this.current_page);
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
            if(value == 1 || value == 2){
                this.max_page = 5;
                this.min_page = 1;
            }
            console.log( this.min_page);
            console.log(this.max_page);
        }
    },
    methods:{
    },
    computed:{
    
    }
    
}
</script>
<style scoped>
.container{
    position: relative;
       top: 120px;
}
.Products{
    position: relative;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.Product{
   margin: 0 20px;
    width: calc(25% - 52px);
    height: 400px;
    border: 1px solid white;
    margin-bottom: 20px;
    border-radius: 10px;
    text-align: center;
    padding: 5px;
    box-shadow:5px 0px 40px 10px #cccccc
}
.Product_name{
    margin-top: 40px;
}
.Product_name div{
    margin-top: 10px;
}
.Product_button{
    margin-top: 10px;
}
.Product_button button{
    background: none;
    border: 1px solid black;
    border-radius: 5px;
    width: 100px;
    height: 40px;
    cursor: pointer;
}
.Product_button button:first-child{
    background: none;
    border: 1px solid black;
    border-radius: 5px;
    width: 100px;
        margin-right: 35px;
    height: 40px;
}
.Product_button button:hover{
    background: black;
    color:white
}
.imgProduct img{
    width: 100%;
    height: 250px;
    object-fit: cover;

}
.paginate{
        position: relative;
    bottom: -20px;
    display: flex;
    justify-content: center;
    left: 50%;
    transform: translate(-50%, -50%);
}
.paginate div{
    width: 20px;
    text-align: center;
    margin: 5px;
}

.paginate div a{
    text-decoration: none;
    color:black;
    display: block;
}
.active{
    background: blue;
    color: white;
}
.NonClass{
    display: none;
}
</style>
