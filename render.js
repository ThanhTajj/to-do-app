export function render(remaining, list, filterValue, todos, search, groupedTodos, format, vi) {
    list.innerHTML = ''

    remaining.textContent = todos.filter(todo => !todo.done).length

    let filterTodos
    if(filterValue==='all'){
        filterTodos = todos
    } else {
        filterTodos = groupedTodos[filterValue] || []
    }

    filterTodos = filterTodos.filter(todo => todo.text.toLowerCase().includes(search.trim().toLowerCase()))

    for (const todo of filterTodos) {
        const {
            done,
            id,
            text,
            createdAt
        } = todo
        const li = document.createElement('li')
        const del = document.createElement('button')
        const status = document.createElement('select')
        const date = document.createElement('span')

        const doing = document.createElement('option')
        doing.value = 'false'
        doing.textContent = "Đang làm"

        const completed = document.createElement('option')
        completed.value = 'true'
        completed.textContent = "Xong"

        li.textContent = text
        del.textContent = "Xóa"
        if (createdAt) { date.textContent = ` - Ngày tạo: ${ format(new Date(createdAt), 'dd/MM/yyyy', { locale: vi }) }` }
        
        li.dataset.id = id
        del.dataset.id = id
        status.dataset.id = id

        status.append(doing, completed)
        status.value = String(done)

        li.append(date, status, del)
        list.append(li)
    }
}
