const hostapi = 'https://webapi-banhang.000webhostapp.com/';
const axios = require('axios');
export default{
    getheader(){
        let headerstoken = window.localStorage.getItem("token");
        if(headerstoken == null){
            return {}
        }
        return {Accept: "application/json",
        Authorization: 'Bearer ' + headerstoken}
    },
    get(url){
        axios.get(hostapi+url)
    },
    postnonelogin(url,data){
        return  axios.post(hostapi+url,data)
    },
    gettoken(url){
      return axios.get(hostapi+url,
            {
                headers:this.getheader()
            })
    },
    posttoken(url,data){
        return axios.get(hostapi+url,data,
            {
                headers:this.getheader()
            })
    }
}