const todos = [
    {
    id: 1,
    content: "refactor",
    done: false
    },
    {
    id: 2,
    content: "make app",
    done: false
    }
]

function fetchTodos(){
    return new Promise((resolve) => {
        setTimeout(() => resolve(todos), 1500)
    })
}

export default {fetchTodos}