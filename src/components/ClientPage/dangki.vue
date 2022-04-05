<template>
    <div class="LoginPage">
        <div class="loginIput">
            <h1>Đăng Kí Thành Viên</h1>
        <form action="" @submit.prevent ='dangki'>
        <div>
            <input type="text" placeholder=" " v-model="username">
            <label for="">UserName</label>
            <span v-if="username==null">Password Trống</span>
        </div>
        <div>
            <input type="text" placeholder=" " v-model="email" @change="changeEmail">
            <label for="">Email</label>
            <span v-if="checkmail==null">Mail không đúng định dạng</span>
             <span v-if="errorRps.email">Mail đã tồn tại</span>
        </div>
          
         <div>
            <input type="password" placeholder=" " v-model="password">
            <label for="">Password</label>
             <span v-if="password==null">Password Trống</span>
        </div>
        <div>
            <input type="password" placeholder=" " v-model="repassword">
               <label for="">Re-Password</label>
               <span v-if="repassword != password && repassword !='' ">Password không trùng khớp</span>
        </div>
        <div>
            <button ref="btnsubmit" :disabled="isComplete">Đăng Kí</button>
        </div>
        </form>
        </div>
    </div>
</template>
<script>
import ApiCall from '@/core/ApiCall.js';
export default {
    setup() {
        return{
        }  
    },
    data(){
        return{
            checkmail:false,
            username:'',
            password:'',
            repassword:'',
            errorRps:''
        }  
    },
    computed:{
        isComplete () {
      return (
        this.username == '' || 
        this.password == '' || 
        this.repassword == '' || 
        this.checkmail == true || 
        this.password != this.repassword
      )
    }
    },
    methods:{
        changeEmail(){
        var mail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(mail.test(this.email)){
            this.checkmail = false ;
        }else{
            this.checkmail = true ;
        }
        },
         dangki(){
               let formData = new FormData();
            formData.append('email', this.email);
            formData.append('password', this.password);
            formData.append('name', this.username);
            ApiCall.postnonelogin('api/register',formData)
            .then(()=>{
                let formData = new FormData();
                formData.append('email', this.email);
                formData.append('password', this.password);
                ApiCall.postnonelogin('api/login',formData)
                .then(Response=>{
                     window.localStorage.setItem('token',Response.data.token);
                       this.$router.push('/home');
                })
            })
            .catch(error=>{
                this.errorRps = error.response.data.errors;
            })

            
        }
    }
}
</script>
<style scoped>
.LoginPage{
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
.loginIput{
    top: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
}
.loginIput div{
    margin-bottom: 20px;
        position: relative;
}
.loginIput h1{
    text-align: center;
    color: white;
}
.loginIput div label{
        position: absolute;
    top: 50%;
    left: 0;
    padding: 5px;
    transform: translateY(-50%);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
    color: white;
}
.loginIput div span{
    position: absolute;
    top: 0;
    right: 10px;
    padding: 6px;
     transform: translateY(-50%);
    color:red;
     background: white;
     border-radius: 5px;
}
.loginIput div input{
   width: 350px;
   height: 40px;
   background: none;
    border-left: none;
    border-top: none;
    border-right: none;
    color:white;
    padding:5px;
}
input[type='text']:not(:placeholder-shown) + label,
input[type='text']:focus + label{
    top:0px;
    left: 5px;
    background: white;
    border: 1px solid white;
   border-radius: 5px;
   color:black;
}
input[type='password']:not(:placeholder-shown) + label,
input[type='password']:focus + label{
    top:0px;
    left: 5px;
    background: white;
    border: 1px solid white;
   border-radius: 5px;
   color:black;
}
.loginIput div:last-child{
    text-align: center;
}
.loginIput div:last-child button{
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
.loginIput div:last-child button:hover{
    background: #3B62A3;
}
.loginIput div:last-child button:disabled{
    cursor: not-allowed;
}
</style>