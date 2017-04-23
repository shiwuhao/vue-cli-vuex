<template>
  <div id="todos" class="container">
    <ul class="list-group">
      <li class="list-group-item" v-for="(todo, index) in todos" v-bind:class="{'completed':todo.completed}">
        <router-link :to="{ name: 'todo', params: { id: todo.id }}">{{ todo.body }}</router-link>
        <div class="pull-right">
          <button class="btn btn-xs" @click="completeTodo(todo)" v-bind:class="[todo.completed ? 'btn-warning' : 'btn-success']">
            {{ todo.completed ? 'cancel' : 'completed' }}
          </button>
          <button class="btn btn-danger btn-xs" @click="deleteTodo(todo, index)">remove</button>
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
        deleteTodo(todo, index) {
          this.$store.dispatch('deleteTodo', {todo, index});
        },
        completeTodo(todo) {
            this.$store.dispatch('completeTodo', todo);
        },
        fetchData(){
            this.$store.dispatch('getTodos');
        }

    },
    components:{
        TodoForm
    },
    created(){
        this.$store.dispatch('getTodos');
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .completed{ color: green; text-decoration: line-through; }
</style>
