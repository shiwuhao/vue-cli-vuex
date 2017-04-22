<template>
    <div id="todo-form">
        <form @submit.prevent="addTodo(newTodo)">
            <div class="form-group">
                <input v-model="newTodo.body" type="text" class="form-control" placeholder="Add a new todo">
            </div>
            <div class="form-group">
                <button class="btn btn-success btn-sm">submit</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'todo-form',
        props:['todos'],
        data() {
            return {
                newTodo:{id:null, body:'', completed:false}
            };
        },
        methods:{
            addTodo(newTodo){
                this.axios.post('http://laravel-vue.dev/api/todo/create', this.newTodo).then(response => {
                    this.todos.push(response.data);
                    this.newTodo = {id:null, body:'', completed:false};
                });
            },
        }
    }
</script>