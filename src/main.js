// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Vuex from 'vuex'

import Todos from './components/Todos'
import Todo from './components/Todo'


Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.config.productionTip = false;


const store = new Vuex.Store({
    status:{
        todos:[]
    },
    mutations:{
        get_todo_list(status, todos){
            status.todos = todos;
        }
    },
    actions:{
        getTodos(store){
            Vue.axios.get('http://laravel-vue.dev/api/todos').then(response => {
               store.commit('get_todo_list', response.data);
            });
        }
    }
});



const routes = [
    {path:'/', component:Todos},
    {path:'/todo/:id', component:Todo, name:'todo'},
];

const router = new VueRouter({
    routes
});

/* eslint-disable no-new */
const app = new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    store,
});
