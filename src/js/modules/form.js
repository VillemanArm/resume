'use strict'

import { validateInput } from "./helpers";

const form = () => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const formContainer = $(".form__container"),
        formData = $(".form__data"),
        contactButton = $(".hero__contact"),
        successWindow = $(".form__success-window"),
        closeButton = $(".form__close"),
        body = document.querySelector("body"),
        URL_APP = "https://script.google.com/macros/s/AKfycby_Xrxygmy0IKCHM1vrIklVA_oqyQW9545lEu9-MGCyww4HqnmvI-YTlOMRP3BnnkBQ/exec";

    contactButton.addEventListener("click", () => {
        formContainer.style.display = "block";
        body.style.overflow = "hidden";
    });

    formContainer.addEventListener("click", (e) => {
        const isForm = e.target.closest(".form__window");

        if (!isForm) {
            formContainer.style.display = "none";
            body.style.overflow = "auto";
            formData.reset();
        }
    });

    // form validation

    const inputName = $("#name");
    const inputCompany = $("#company");
    const inputPhoneNumber = $("#phoneNumber");
    const inputEmail = $("#email");
    const inputMessage = $("#message");
    const nameRegExp = /^[a-zA-Z\s-]+$/;
    const textRegExp = /^[a-zA-Z0-9\s\.,!?';:()]+$/;
    const emailRegExp = /^[A-Za-z0-9_.@-]+$/;
    const digitsRegExp = /\d/;

    // input validaton

    inputName.addEventListener('input', () => {
        validateInput(inputName, nameRegExp)
    });

    inputCompany.addEventListener('input', () => {
        validateInput(inputCompany, textRegExp)
    });

    inputPhoneNumber.addEventListener('input', () => {
        validateInput(inputPhoneNumber, digitsRegExp, '+')
    });

    inputEmail.addEventListener('input', () => {
        validateInput(inputEmail, emailRegExp)
    });

    inputMessage.addEventListener('input', () => {
            validateInput(inputMessage, textRegExp)
    });

    // data validation

    const validation = new JustValidate(".form__data");

    validation
        .addField('#name', [
            {
                rule: 'required',
                value: true,
                errorMessage: 'Enter your name!'
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'The name is too short!'
            },
            {
                rule: 'maxLength',
                value: 62,
                errorMessage: 'The name is too long!'
            },
        ])
        .addField('#phoneNumber', [
            {
                rule: 'required',
                value: true,
                errorMessage: 'Enter your phone number!'
            },
            {
                rule: 'maxLength',
                value: 13,
                errorMessage: 'The phone number is too long!'
            },
        ])
        .addField('#company', [
            {
                rule: 'maxLength',
                value: 62,
                errorMessage: 'The company name is too long!'
            },
        ])
        .addField('#email', [
            {
                rule: 'email',
                errorMessage: 'wrong email format!'
            },
        ])
        .onSuccess((e) => {
            const userData = {
                name: inputName.value.trim(),
                email: inputEmail.value.trim(),
                phone: inputPhoneNumber.value.trim(),
                message: inputMessage.value.trim(),
                company: inputCompany.value.trim(),
            }

            fetch(URL_APP, {
                method: 'POST',
                body: JSON.stringify(userData), 
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                mode: "no-cors",
            })
                .then(response => {
                    successWindow.style.display = "block";
                    successWindow.innerHTML = '<h3>Thank you for the application!</h3>'
                                    
                    return response
                })
                .catch(error => {
                    successWindow.style.display = "block";
                    successWindow.innerHTML = '<h3>Something went wrong=( Please contact me any way from the contact list.</h3>'
                    
                    return console.log(error)
                })
            
            setTimeout(function(){        
                    successWindow.style.display = "none";
                    formContainer.style.display = "none";
                }, 5000);
            
                body.style.overflow = "auto";
                formData.reset();
            
        });

    closeButton.addEventListener("click", () => {
        formContainer.style.display = "none";
        body.style.overflow = "auto";
        formData.reset();
        $$('.just-validate-error-label').forEach((item) => {
            item.remove()
        });
        $$('.just-validate-error-field').forEach((item) => {
            item.classList.remove('just-validate-error-field')
        }) 
    });
}

export default form