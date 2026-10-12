export function getTodos() {
    return JSON.parse(localStorage.getItem('todos') ?? '[]')
}

export function setTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}