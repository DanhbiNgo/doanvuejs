import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(router)
app.config.globalProperties.$filters = {
    capitalize: function (value) {
        var ngia = Number(value).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        value = ngia.substring(0,ngia.indexOf('.')) + "VNĐ";
        return value;
           }
}
app.mount('#app')