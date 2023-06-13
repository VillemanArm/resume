'use strict';

let form = document.querySelector('.form')
let name = document.querySelector('#name')
let gender = document.querySelector('#gender')
let phone = document.querySelector('#phone')
let post = document.querySelector('#post')
let submit = document.querySelector('.form__button[type=submit]')
let table = document.querySelector('.table')

class Person {
    constructor(name, gender, phone) {
        this.name = name
        this.gender = gender
        this.phone = phone
    }
}

class Employee extends Person {
    constructor(name, gender, phone, post) {
        super(name, gender, phone)
        this.post = post
        this.id = Employee.employees.length
    }

    static employees = []

    static getEmployees() {
        if (localStorage.employees) {
            Employee.employees = JSON.parse(localStorage.employees)
            createTable()
        }else {
            localStorage.employees = JSON.stringify(employees)
        }
    }

}

const createTable = () => {
    table.querySelectorAll('.table__row').forEach((row) => {
        row.remove()
    })

    Employee.employees.forEach((employee) => {
        const newRow = document.createElement('tr')
        newRow.classList.add('table__row')
        newRow.innerHTML = `
        <td class="table__name">${employee.name}</td>
        <td class="table__gender">${employee.gender}</td>
        <td class="table__phone">${employee.phone}</td>
        <td class="table__post">${employee.post}</td>
        <td class="table__del"><button class="table__del-button" id="${employee.id}">Удалить</button></td>
`
        table.append(newRow)

        const delButton = document.getElementById(employee.id)
        delButton.addEventListener('click', () => {
            Employee.employees.forEach((employee) => {
                if (employee.id == delButton.id) {
                    Employee.employees.pop(employee)
                    localStorage.employees = JSON.stringify(Employee.employees)
                    createTable()
                }
            })
    })
    })
}

Employee.getEmployees()

submit.addEventListener('click', (event) => {
    event.preventDefault() 
    const newEmployee = new Employee(name.value, gender.value, phone.value, post.value)
    Employee.employees.push(newEmployee)
    localStorage.employees = JSON.stringify(Employee.employees)
    createTable()
    form.reset()
})


