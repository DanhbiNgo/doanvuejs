import {createRouter,createWebHistory} from 'vue-router'

import adminPage from '../components/adminPage/AdminPage.vue'
import clientpage from '../components/ClientPage/Home.vue'
import dangki from '../components/ClientPage/dangki.vue'
import login from '../components/ClientPage/login.vue'

const routes = [
    {path:'/adminpage',component: adminPage},
    {path:'/Home',component: clientpage},
    {path:'/dangki',component: dangki},
    {path:'/login',component: login},


]

const router = createRouter({
history: createWebHistory(),
routes
})

export default router