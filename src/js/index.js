'use strict';

import openBlock from "./modules/open_block";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const worksWebpages = $(".works__webpages");
const worksList = $(".works__list");
const skillsBlockWraps = $$(".skills__block-wrap");
const skillsBlocks = $(".skills__blocks");
const worksBlockWrap = $('.works__block-wrap');

//open blocks

openBlock()

// worksBlockWrap.addEventListener("click", () => {
//     worksBlockWrap.classList.toggle('block-clicked')
//     if (worksBlockWrap.classList.contains('block-clicked') && window.innerWidth > 768) 
//     {
//         $('.contacts').style.marginTop = "4rem";
//     } else
//     {
//         $('.contacts').style.marginTop = "16rem";
//     }
// });


// skillsBlockWraps.forEach((wrap) => {
//     wrap.querySelector('div').addEventListener("click", () => {
//             wrap.classList.toggle('block-clicked')
//             if (wrap.classList.contains('block-clicked') && window.innerWidth > 768) 
//             {
//                 $('.works').style.marginTop = "4rem";
//             } else
//             {
//                 $('.works').style.marginTop = "16rem";
//             }
//         });
// });


// form

const formContainer = $(".form__container"),
    formData = $(".form__data"),
    contactButton = $(".hero__contact"),
    successWindow = $(".form__success-window"),
    closeButton = $(".form__close"),
    body = document.querySelector("body"),
    URL_APP = "https://script.google.com/macros/s/AKfycbxvgn5osvpAPiO0CoSrDvoc0wKONSNSHaSJu35l3UGcpJGFakP_nJxnuv0uSNFSKJRj/exec";

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


function validateInput(input, regExp, plus = '') {
    if(!regExp.test(input.value[input.value.length - 1])) 
    {
        input.value = input.value.slice(0, input.value.length - 1)
    }
    if (plus === '+' && !input.value.startsWith('+') && input.value !== '') 
    {
        input.value = '+' + input.value
    }
};

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
        let details = {
            name: inputName.value.trim(),
            email: inputEmail.value.trim(),
            phone: inputPhoneNumber.value.trim(),
            message: inputMessage.value.trim(),
            company: inputCompany.value.trim(),
        };
    
            let formBody = [];
            for (let property in details) {
                // кодируем названия и значения параметров
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
        // склеиваем параметры в одну строку, которую понимает Apps Script
        formBody = formBody.join("&");
    
        const response = fetch(URL_APP, {
            method: "POST",
            headers: {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            mode: "no-cors",
            body: formBody,
            })
    
        successWindow.style.display = "block";
    
        setTimeout(function(){        
            successWindow.style.display = "none";
            formContainer.style.display = "none";
        }, 3000);
    
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
    

