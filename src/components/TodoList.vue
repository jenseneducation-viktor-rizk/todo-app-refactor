<template>
<div class="todo-list">
    <p>Du har <strong>{{uncheckedTodos}}</strong> todos kvar att göra</p>
    <ul>
        <todo-item 
            v-for="todo in todos"
            v-bind:todo="todo"
            v-bind:key="todo.id"
            v-on:remove="removeTodo(todo.id)"
            v-on:checkbox="updateCheck(todo)"
            v-on:update="newContent => updateTodo(todo, newContent)"
        />
    </ul>
    <input type="text" v-model="content">
    <button v-on:click="createTodo">Lägg till todo</button>
</div>
</template>
<script>
import TodoItem from './TodoItem'
export default {
    components: {TodoItem},
    data(){return{
        content: ""
    }},
    computed: {
        todos(){
            return this.$store.state.todos
        },
        
        uncheckedTodos(){
            return this.todos.reduce((acc,todo) => acc + !todo.done, 0)
        }
    },
    async mounted(){
            await this.$store.dispatch('listTodos')
        },
    
    methods: {
        async createTodo(){
            this.$store.dispatch('pushTodos', this.content)
        },
        removeTodo(id){
            this.$store.dispatch('removeThisTodo', id)       
            },
        updateCheck(todoItem){
            this.$store.dispatch('updateThisCheck', todoItem)
        },
        updateTodo(todo, newContent) {
            
            const newData = {
                id: todo.id,
                content: newContent
            }
            this.$store.dispatch('updateThisTodo', newData)

        }
    }
}
</script>

<style scoped>
.todo-list{
    min-width: 20rem;
    max-width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(0,0,0,0.15);
}
ul{
    list-style: none;
    padding: 0;
    width: 100%;
}
input, button{
    width: 100%;
    font-size: 0.8rem;
    padding: 0.5rem;
    box-sizing: border-box;
    text-align: center;
    outline: none;
}
button{
    border: 0;
    background-color: rgb(50,50,50);
    color: white;
    font-size: 1.1rem;
    font-weight: 500;
}

</style>