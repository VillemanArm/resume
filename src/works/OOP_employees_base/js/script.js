'use strict';

// get elements from HTML
let form = document.querySelector('.form')
let name = document.querySelector('#name')
let gender = document.querySelector('#gender')
let phone = document.querySelector('#phone')
let post = document.querySelector('#post')
let submit = document.querySelector('.form__button[type=submit]')
let table = document.querySelector('.table')

// Сreate classes for data storage.
class CompanyEmployee {
    constructor(name, gender, phone) {
        this.name = name
        this.gender = gender
        this.phone = phone
    }
}

class EmployeeOnPost extends CompanyEmployee {
    constructor(name, gender, phone, post) {
        super(name, gender, phone)
        this.post = post
        this.id = Date.now()
    }

    static employeesList = []

    static getEmployees() {
        if (localStorage.employeesList) {
            EmployeeOnPost.employeesList = JSON.parse(localStorage.employeesList)
            createTable()
        }else {
            localStorage.employeesList = JSON.stringify(EmployeeOnPost.employeesList)
        }
    }

}

//function for table creation
const createTable = () => {
    table.querySelectorAll('.table__row').forEach((row) => {
        row.remove()
    })

    EmployeeOnPost.employeesList.forEach((employee) => {
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
            EmployeeOnPost.employeesList.forEach((employee) => {
                if (employee.id == delButton.id) {
                    const employeeIndex = EmployeeOnPost.employeesList.indexOf(employee)
                    EmployeeOnPost.employeesList.splice(employeeIndex, 1)
                    localStorage.employeesList = JSON.stringify(EmployeeOnPost.employeesList)
                    createTable()
                }
            })
    })
    })
}

EmployeeOnPost.getEmployees()

// add new employee and create new table row
submit.addEventListener('click', (event) => {
    event.preventDefault() 
    const newEmployee = new EmployeeOnPost(name.value, gender.value, phone.value, post.value)
    EmployeeOnPost.employeesList.push(newEmployee)
    localStorage.employeesList = JSON.stringify(EmployeeOnPost.employeesList)
    createTable()
    form.reset()
})


