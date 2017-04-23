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
    state:{
        todos:[],
        newTodo:{id:null, title:'', completed:0}
    },
    mutations:{
        get_todo_list(state, todos){
            state.todos = todos;
        },
        complete_todo(state, todo) {
            todo.completed = !todo.completed;
        },
        delete_todo(state, index){
            state.todos.splice(index, 1);
        },
        add_todo(state, todo){
            state.todos.push(todo);
        }
    },
    actions:{
        getTodos(store){
            Vue.axios.get('http://laravel-vue.dev/api/todos').then(response => {
               store.commit('get_todo_list', response.data);
            });
        },
        completeTodo(store, todo){
            Vue.axios.patch('http://laravel-vue.dev/api/todo/'+todo.id+'/completed',).then(response => {
                store.commit('complete_todo', todo);
            });
        },
        deleteTodo(store, obj){
            Vue.axios.delete('http://laravel-vue.dev/api/todo/'+obj.todo.id).then(response => {
                store.commit('delete_todo', obj.index);
            });
        },
        addTodo(store, todo) {
            Vue.axios.post('http://laravel-vue.dev/api/todo/create', todo).then(response => {
                store.commit('add_todo', response.data);
            });
            store.state.newTodo = {id:null, body:'', completed:false};
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
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});
