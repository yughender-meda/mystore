import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import AccessForm from './components/AccessForm.vue';
import GetItems from './components/GetItems.vue';
import CreateItems from './components/CreateItems.vue'
import BillItems from './components/BillItems.vue'
import ManageBill from './components/ManageBill.vue'
import FinalBilling from './components/FinalBilling.vue'
import signup from './components/SignUp.vue'
import setview from './components/SetView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      {path:'',component:setview},
      {path: '/login',component:AccessForm}, // our-domain.com/teams => TeamsList
      {path: '/billing',component:BillItems},
      {path:'/getall',component:GetItems},
      {path:'/createitems',component:CreateItems},
      {path:'/manage',component:ManageBill},
      {path:'/finalbilling',component:FinalBilling},
      {path:'/signup',component:signup}
    ]
  });


const store = createStore({
    state() {
        return{
            items:[],
            isLogin:true,
            token:null,
            finalAmount:null,
            custName:"",
            custContact:null

        };
    }
})


const app = createApp(App)

app.use(store);
app.use(router);
app.mount('#app')


