<template>
    <div>
        <div class="header">
        <div class="ImgLogo" @click="lishow = true"><img src="@/assets/AdminPage/img/logo.png" alt=""></div>
        <div class="menu-top">
            <div class="menu-left">
            <div class="listProductHover">
                <div>Sản Phẩm</div>
                <ul class="listProductType">
                    <li v-for="(ProductType,index) in ProductTypeRps" :key="index" @click="idProductType=ProductType.l_ma">
                        <img :src="hostServer+ProductType.Img" alt="" @click="lishow= false">
                        <div>{{ProductType.l_ten}}</div>
                    </li>
                </ul>
                </div>
            <div>Khám Phá</div>
            <div>Dịch Vụ</div>
            <div>Thành Viên</div>
            </div>
            <div class="menu-right">
            <div>Tìm Kiếm</div>
            <div class="cart">
            <div>Giỏ Hàng</div>
            <ul class="hidecart">
                <li></li>
            </ul>
            </div>
            <div>Login</div>
            </div>
        </div>
        </div>
        <div class="banner" v-if="lishow">
            <div class="Priv" @click="current_img--" style="color:white; cursor:pointer" @mouseover="Loadimg = !Loadimg" @mouseout="Loadimg = !Loadimg"><span class="material-icons-outlined">navigate_before</span></div>
            <div v-for="(img,index) in ImgSrc" :key="index" :class="{Hide: index == current_img}" class="ImgBanner">
                <img :src="img.One" @mouseover="Loadimg = !Loadimg" @mouseout="Loadimg = !Loadimg"/>
            </div>
            <div class="Next" @click="current_img++" style="color:white; cursor:pointer" @mouseover="Loadimg = !Loadimg" @mouseout="Loadimg = !Loadimg"><span class="material-icons-outlined">navigate_next</span></div>
        </div>
        <container :idProductT="idProductType" v-show="lishow == false"/>
    </div>
</template>
<script>
const axios = require('axios');
import Container from '@/components/ClientPage/Container.vue';
import ApiCall from '@/core/ApiCall.js';
export default {
    components:{Container},
    data(){
        return{
            ProductTypeRps:'',
            lishow:true,
            hostServer:'https://webapi-banhang.000webhostapp.com/',
            ImgSrc:[
               {One:require('../../assets/ClientPage/ImgBanner/4kGame.jpg')},
               {One:require('../../assets/ClientPage/ImgBanner/1616999865.jpg')},
               {One:require('../../assets/ClientPage/ImgBanner/1620613780.jpg')},
               {One:require('../../assets/ClientPage/ImgBanner/arusc.jpg')}
            ],
            current_img:0,
            Loadimg:false,
            Interval:'',
            idProductType:0

        }
    },
    async created(){
            await axios.get(this.hostServer+'api/getProductType/all')
           .then(response=>{
               this.ProductTypeRps = response.data;
              console.log(this.ProductTypeRps);
          })
           .catch(error=>{
               this.errors = error.response.data.errors;
              this.errorlogin= error.response.status;
              console.log(error.response.data);
           })
        },
    setup(){

    },
    mounted(){
        this.Loadimg = !this.Loadimg;
        let header = window.localStorage.getItem('token');
        console.log(header);
        ApiCall.gettoken('api/getuser')
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{
            console.log(error.response.data)
        })
    },
    watch:{
        current_img(value){
            if(value <= 0){
                this.current_img = this.ImgSrc.length -1;
            }
            if(value >=  this.ImgSrc.length -1){
                this.current_img = 0;
            }
        },
        Loadimg(){
            if(this.Loadimg == true){
              this.Interval =  setInterval(()=>{
            this.current_img++;
            if(this.current_img > this.ImgSrc.length -1){
                this.current_img = 0;
            }
            }, 3000);
            }
            if(this.Loadimg == false){
                clearInterval(this.Interval);
            }
        },
        idProductType(){
            this.lishow = false;
        }

    },
    methods:{

    }
}
</script>
<style scoped>
.header{
    background: black;
    display: flex;
    color:white;
    height: 100px;
    align-items: center;
    font-size: 20px;
    position: fixed;
    z-index: 99;
    width: 100%;
}
.menu-top{
    display:flex;
    justify-content: space-between;
    gap:200px;
    align-items:center;
}
.menu-left {
    display:flex;
    gap:0 60px;
    margin-left: 20px;
}

.menu-right{
    display: flex;
    gap:0 60px;
}
.listProductType{
    display: flex;
    position: absolute;
    justify-content: center;
    background: black;
    list-style: none;
    left: 0;
    padding: 5px;
    width: 100%;
    display: none;
    z-index: -1;
    margin-top: -10px;
     animation-name: example;
     animation-duration: 0.6s;
        padding-top: 50px;
}
@keyframes example {
  from {top:0px; z-index: 99; padding-top: 0px;}
  to {top:60px; z-index: -1;padding-top: 50px;}
}
.listProductType img{
        width: 150px;
    height: 150px;
    object-fit: cover;
}
.listProductType li{
        width: 185px;
        text-align: center;
        cursor: pointer;
        margin-right: 10px;
}
.listProductType li:hover{
    background: #cccccc;

}

.listProductHover:hover .listProductType{
    display: flex;
}
.banner{
    position: relative;
    top:20%;
    display: block;
}
.Priv{
    position: absolute;
    top:50%;
    color: red;
}
.Next{
    position: absolute;
    top:50%;
    right: 0;
    color: red;
}
.ImgBanner{
    display: none;
}
.Hide{
    display: block;
}
.ImgBanner img{
    width: 100%;
        margin-top: 100px;
}
.hidecart{
    list-style: none;
    display: none;
}
</style>