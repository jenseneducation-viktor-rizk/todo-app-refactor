import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: []
    },
    mutations: {
        setTodos(state, data){
            state.todos = data
        },
        addTodos(state, content){
            state.todos.push({
                id: Date.now(),
                content,
                done: false
            })
        },
        removeTodo(state, id){
            state.todos = state.todos.filter(todo => todo.id != id)
        },
        updateCheck(state, todoItem){
            let todo = state.todos.find(todo => todo.id == todoItem.id)
            todo.done = !todo.done 
        },
        updateTodo(state, newData) {
           let todo = state.todos.find(todo => todo.id == newData.id)
           todo.content = newData.content
        }
    },
    actions: {
        async listTodos(context){
            const data = await API.fetchTodos()
            context.commit('setTodos', data)
        },
        pushTodos(context, content){
            context.commit('addTodos', content)
        },
        removeThisTodo(context, id){
            context.commit('removeTodo', id)
        },
        updateThisCheck(context, todoItem){
            context.commit('updateCheck', todoItem)
        },
        updateThisTodo(context, newData){
            context.commit('updateTodo', newData)
        }
    }
})