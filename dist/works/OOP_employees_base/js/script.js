'use strict';

//get elements from HTML
let form = document.querySelector('.form')
let fullName = document.querySelector('#name')
let gender = document.querySelector('#gender')
let phone = document.querySelector('#phone')
let post = document.querySelector('#post')
let submit = document.querySelector('.form__button[type=submit]')
let table = document.querySelector('.table')

// Сreate classes for data storage.
class Person {
    constructor(name, gender, phone) {
        this.name = name
        this.gender = gender
        this.phone = phone
    }
}

// Create managing class
class Employee extends Person {
    constructor(name, gender, phone) {
        super(name, gender, phone)
    }

    static employeesList = []

    static getEmployees() {
        if (localStorage.employeesList) {
            Employee.employeesList = JSON.parse(localStorage.employeesList)
            createTable()
        }else {
            localStorage.employeesList = JSON.stringify(Employee.employeesList)
        }
    }

    addToEmployeesList() {
        Employee.employeesList.push(this)
        localStorage.employeesList = JSON.stringify(Employee.employeesList)
    }

    removeFromEmployeesList() {
        const employeeIndex = Employee.employeesList.indexOf(this)
        Employee.employeesList.splice(employeeIndex, 1)
        localStorage.employeesList = JSON.stringify(Employee.employeesList)
    }
}

class Dispatcher extends Employee {
    constructor(name, gender, phone) {
        super(name, gender, phone)
        this.id = Date.now()
        this._turn = ''
        this.post = 'диспетчер'

        super.addToEmployeesList()
    }

    _courses = []
    get turn() {
        return this._turn
    }  
    
    set turn(num) {
        num = Number(num)

        if (num > 0 && num < 4) this._turn = num
    }

    get courses() {
        return this._courses
    }  
    
    set addCourses(str) {
        this._courses.push(str)
    }

    set removeCourses(str) {
        let index = this._courses.indexOf(str)

        if (index !== -1) this._courses.splice(index, 1)
    }
}

class Driver extends Employee {
    constructor(name, gender, phone) {
        super(name, gender, phone)
        this.id = Date.now()
        this._turn = ''
        this._licenseСategories = []
        this._carNumber = ''
        this.post = 'водитель'

        super.addToEmployeesList()
    }

    get turn() {
        return this._turn
    }  
    
    set turn(num) {
        num = Number(num)

        if (num > 0 && num < 4) this._turn = num
    }

    get licenseСategories() {
        return this._licenseСategories
    }  
    
    set addLicenseСategory(str) {
        this._licenseСategories.push(str)
    }

    get CarNumber() {
        return this._carNumber
    }  
    
    set CarNumber(str) {
        const carNumberSample = /^[а-яА-Я]\d{3}[а-яА-Я]{2}\d{2}$/i
        
        if (carNumberSample.test(str)) this._carNumber = str
    }
}

class Mechanic extends Employee {
    constructor(name, gender, phone) {
        super(name, gender, phone)
        this.id = Date.now()
        this._rank = ''
        this._role = ''
        this.post = 'механик'

        super.addToEmployeesList()
    }

    get rank() {
        return this._rank
    }  
    
    set rank(num) {
        num = Number(num)

        if (num > 0 && num <= 5) this._rank = num
    }

    get role() {
        return this._role
    }  
    
    set role(str) {
        this._role = str
    }
}


//functions block
const createTable = () => {
    table.querySelectorAll('.table__row').forEach((row) => {
        row.remove()
    })

    Employee.employeesList.forEach((employee) => {
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
            Employee.employeesList.forEach((employee) => {
                if (employee.id == delButton.id) {
                    const employeeIndex = Employee.employeesList.indexOf(employee)
                    Employee.employeesList.splice(employeeIndex, 1)
                    localStorage.employeesList = JSON.stringify(Employee.employeesList)
                    createTable()
                }
            })
    })
    })
}

Employee.getEmployees()

// add new employee and create new table row
submit.addEventListener('click', (event) => {
    event.preventDefault() 

    switch (post.value) {
        case "механик":
            new Mechanic(fullName.value, gender.value, phone.value)
            break;
        case "водитель":
            new Driver(fullName.value, gender.value, phone.value)
            break;
        case "диспетчер":
            new Dispatcher(fullName.value, gender.value, phone.value)
            break;       
    }

    createTable()
    form.reset()
})