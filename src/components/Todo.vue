<template>
  <div class="todo">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="todo" class="content">
      <h2>{{ todo.body }}</h2>
    </div>
  </div>
</template>

<script>
import TodoForm from './TodoForm'
export default {
    name: 'todo',
    data(){
        return {
            loading:false,
            todo:null,
            error:null
        }
    },
    created(){
      this.fetchData();
    },
    watch:{
        '$route': 'fetchData'
    },
    methods:{
      fetchData () {
            this.loading = true;
            this.axios.get('http://laravel-vue.dev/api/todo/'+this.$route.params.id).then(response => {
                this.loading = false;
                this.todo = response.data;
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .computed{ color: green; text-decoration: line-through; }
</style>
