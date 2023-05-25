'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const worksWebpages = $(".works__webpages");
const worksList = $(".works__list");
const skillsBlockWraps = $$(".skills__block-wrap");
const skillsBlocks = $(".skills__blocks");
const worksBlockWrap = $('.works__block-wrap');

//open blocks

worksBlockWrap.addEventListener("click", () => {
    worksBlockWrap.classList.toggle('block-clicked')
    if (worksBlockWrap.classList.contains('block-clicked') && window.innerWidth > 768) 
    {
        $('.contacts').style.marginTop = "4rem";
    } else
    {
        $('.contacts').style.marginTop = "16rem";
    }
});


skillsBlockWraps.forEach((wrap) => {
    wrap.querySelector('div').addEventListener("click", () => {
            wrap.classList.toggle('block-clicked')
            if (wrap.classList.contains('block-clicked') && window.innerWidth > 768) 
            {
                $('.works').style.marginTop = "4rem";
            } else
            {
                $('.works').style.marginTop = "16rem";
            }
        });
});


// form

const formContainer = document.querySelector(".form__container"),
    formData = document.querySelector(".form__data"),
    contactButton = document.querySelector(".hero__contact"),
    successWindow = document.querySelector(".form__success-window"),
    closeButton = document.querySelector(".form__close"),
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

// навешиваем обработчик на отправку формы
formData.addEventListener("submit", async (e) => {
    // отменяем действие по умолчанию
    e.preventDefault();

    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const phoneNumber = document.querySelector("#phoneNumber");
    const message = document.querySelector("#message");
    const company = document.querySelector("#company");

    // собираем данные из элементов формы
    let details = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phoneNumber.value.trim(),
        message: message.value.trim(),
        company: company.value.trim(),
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

    const response = await fetch(URL_APP, {
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
});

// function checkInput(input, validCharacters) {
//     input.addEventListener('input', () => {
//         if(!validCharacters.test(input.value[input.value.length - 1])) input.value = input.value.slice(0, [input.value.length - 1]);
//     });
// }

// let russianLetters = /^[\u0400-\u04FF\s.,!?;:()"'-]+$/;
// let digits = /\d/;