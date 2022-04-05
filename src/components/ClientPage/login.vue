<template>
    <div class="dangnhap">
        <div class="dangnhapIput">
        <form action="" @submit.prevent = 'loginsys'>
        <h1>Đăng Nhập</h1>
        <div>
            <input type="text" placeholder=" " v-model="email">
            <label for="">Email</label>
        </div>
        <div>
            <input type="password" placeholder=" " v-model="password">
            <label for="">Password</label>
        </div>
        <div style="color:red; text-align:center" v-if="errorlogin">Tài khoản hoặc mật khẩu không chính xác</div>
        <div><button>Đăng Nhập</button></div>
        </form>
        </div>
    </div>
</template>
<script>
import ApiCall from '@/core/ApiCall.js';
export default {
    setup() {
        
    },
    mounted(){

    },
    data(){
        return{
            email:'',
            password:'',
            errorlogin:''
        }
    },
    methods:{
        loginsys(){
             let formData = new FormData();
            formData.append('email', this.email);
            formData.append('password', this.password);
            ApiCall.postnonelogin('api/login',formData)
            .then(response=>{
                window.localStorage.setItem('token',response.data.token);
                this.$router.push('/home');
            })
            .catch(error=>{
                this.errorlogin = error.response.data.errors.account;
            })
        }
    }
}
</script>
<style scoped>
.dangnhap{
  background: url('../../assets/ClientPage/ImgBanner/All1620383654.jpg') no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    -webkit-background-size: cover;
    width: 100%;
    height: auto;
    min-height: 667px;
    position: relative;
}
.dangnhapIput{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color:white;
}
.dangnhapIput h1{
    text-align: center;
}
.dangnhapIput div{
    position: relative;
    margin-bottom: 10px;
}
.dangnhapIput div label{
    position: absolute;
    left: 5px;
    top:50%;
     transform: translateY(-50%);
}
.dangnhapIput div input{
    background: none;
    width: 300px;
    height: 40px;
    color:white;
    border: none;
}
input:not(:placeholder-shown) + label,
.dangnhapIput div input:focus + label{
    top: 0;
    background: white;
    color:black;
    border: 1px solid white;
    border-radius: 5px;
}
.dangnhapIput div:last-child button{
   border: none;
    width: 100%;
    font-weight: 500;
    font-size: 26px;
    background: black;
    color: white;
    padding: 10px 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 1s;

}
.dangnhapIput div:last-child button:hover{
background: #3B62A3;
}
.dangnhapIput div:last-child button:disabled{   
        cursor: not-allowed;
}
</style>