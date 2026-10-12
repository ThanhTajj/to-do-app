export function render(remaining, list, filterValue, todos) {
    list.innerHTML = ''

    remaining.textContent = todos.filter(todo => !todo.done).length

    const filterTodos = todos.filter(todo => {
        if (filterValue === 'all') return true
        return String(todo.done) === filterValue
    })

    for (const todo of filterTodos) {
        const {
            done,
            id,
            text
        } = todo
        const li = document.createElement('li')
        const del = document.createElement('button')
        const status = document.createElement('select')

        const doing = document.createElement('option')
        doing.value = 'false'
        doing.textContent = "Đang làm"

        const completed = document.createElement('option')
        completed.value = 'true'
        completed.textContent = "Xong"

        li.textContent = text
        del.textContent = "Xóa"

        li.dataset.id = id
        del.dataset.id = id
        status.dataset.id = id

        status.append(doing, completed)
        status.value = String(done)

        li.append(status, del)
        list.append(li)
    }
}
