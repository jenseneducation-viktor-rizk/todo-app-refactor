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
    data: () => ({
        todos: [],
        content: ""
    }),
    computed: {
        uncheckedTodos(){
            return this.todos.reduce((acc,todo) => acc + !todo.done, 0)
        }
    },
    
    methods: {
        createTodo(){
            this.todos.push({
                id: Date.now(),
                content: this.content,
                done: false
            })
        },
        removeTodo(id){
            this.todos = this.todos.filter(todo => todo.id != id)
        },
        updateCheck(todo){
            todo.done = !todo.done 
        },
        updateTodo(todo, newContent) {
            todo.content = newContent
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