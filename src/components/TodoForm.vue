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
        computed:{
            newTodo(){
                return this.$store.state.newTodo;
            }
        },
        methods:{
            addTodo(newTodo){
                this.$store.dispatch('addTodo', this.newTodo);
            },
        }
    }
</script>