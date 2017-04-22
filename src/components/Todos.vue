<template>
  <div id="todos" class="container">
    <ul class="list-group">
      <li class="list-group-item" v-for="(todo, index) in todos" v-bind:class="{'completed':todo.completed}">
        <router-link :to="{ name: 'todo', params: { id: todo.id }}">{{ todo.body }}</router-link>
        <div class="pull-right">
          <button class="btn btn-xs" @click="completeTodo(todo)" v-bind:class="[todo.completed ? 'btn-warning' : 'btn-success']">
            {{ todo.completed ? 'cancel' : 'completed' }}
          </button>
          <button class="btn btn-danger btn-xs" @click="deleteTodo(index, todo)">remove</button>
        </div>
      </li>
    </ul>
      <todo-form></todo-form>
  </div>
</template>

<script>
import TodoForm from './TodoForm'
export default {
    name: 'todos',
    computed:{
      todos(){
          return this.$store.state.todos;
      }
    },
    methods:{
        deleteTodo(index, todo) {
            this.axios.delete('http://laravel-vue.dev/api/todo/'+todo.id).then(response => {
                console.log(response.data);
                this.todos.splice(index, 1);
            });
        },
        completeTodo(todo) {
            this.axios.patch('http://laravel-vue.dev/api/todo/'+todo.id+'/completed',).then(response => {
                console.log(todo);
                todo.completed = response.data.completed;
                console.log(response.data);
            });
        },
        fetchData(){
            this.axios.get('http://laravel-vue.dev/api/todos').then(response => {
                this.todos = response.data;
            });
        }

    },
    components:{
        TodoForm
    },
    mounted(){
        this.$store.dispatch('getTodos');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .completed{ color: green; text-decoration: line-through; }
</style>
