'use strict';

// functions for shorthand access to page elements
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// get page elements
const todoControl = $('.todo-control');
const headerInput = $('.header-input');
const todoList = $('.todo-list');
const todoCompleted = $('.todo-completed');

// create to do list
function render() {
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

    todoData.forEach((item) => {
        const li = document.createElement('li')
        li.classList.add('todo-item')

        li.innerHTML = '<span class="text-todo">'+ item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' + 
            '<button class="todo-complete"></button>' + 
            '</div>'

        if(item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        
        li.querySelector('.todo-complete').addEventListener('click', () => {
            item.completed = !item.completed
            localStorage.todoData = JSON.stringify(todoData)
            render()
        })

        li.querySelector('.todo-remove').addEventListener('click', () => {
            li.remove()
            todoData = todoData.filter((f) => {return f != item})
            localStorage.todoData = JSON.stringify(todoData)
        })
    })
}

// create a new task on button click
todoControl.addEventListener('submit', (event) => {
    event.preventDefault()

    if (headerInput.value != '') {
        const newTodo = {
            text: headerInput.value,
            completed: false,
        }

        todoData.push(newTodo)
        localStorage.todoData = JSON.stringify(todoData)
        headerInput.value = ''

        render()
    }
})

// create storage for todo list
if (!localStorage.todoData) localStorage.todoData = JSON.stringify([])

// get todo list from storage and render it
let todoData = JSON.parse(localStorage.todoData)
render()