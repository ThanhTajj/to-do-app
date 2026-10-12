import { getTodos, setTodos } from "./storage.js"
import { render } from "./render.js"

const form = document.querySelector('#todo-form')
const input = document.querySelector('#todo-input')
const list = document.querySelector('#todo-list')
const filter = document.querySelector('#filter')
const remaining = document.querySelector('#remaining')

let todos = getTodos()

function updateUI() {
    render(remaining, list, filter.value, todos)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const text = input.value.trim()
    if (!text) return
    todos = [
        ...todos,
        {
            id: Date.now(),
            text: text,
            done:false
        }
    ]
    setTodos(todos)
    input.value = ''
    updateUI()
})

list.addEventListener('click', (e) => {
    const {
        tagName,
        dataset
    } = e.target
    if(tagName === "BUTTON") {
        const id = Number(dataset.id)
        todos = todos.filter(t => t.id !== id)
        setTodos(todos)
        updateUI()
    }
})

list.addEventListener('change', (e) => {
    const {
        tagName,
        dataset,
        value
    } = e.target
    if(tagName === "SELECT") {
        const id = Number(dataset.id)
        const todo = todos.find(todo => todo.id === id)
        if (todo) {
            todo.done = value === 'true'
            setTodos(todos)
            updateUI()
        }
    }
})

filter.addEventListener('change', updateUI)

updateUI()