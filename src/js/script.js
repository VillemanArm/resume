const worksWebpages = document.querySelector(".works__webpages");
const worksList = document.querySelector(".works__list");
const skillsBlockWraps = document.querySelectorAll(".skills__block-wrap");

// opening lists
worksWebpages.addEventListener("click", () => {
    if (worksWebpages.classList.contains("works__block_clicked")) {
        worksList.style.display = "none";
        worksWebpages.classList.remove("works__block_clicked");
    } else {
        worksList.style.display = "block";
        worksWebpages.classList.add("works__block_clicked");
    }
});

skillsBlockWraps.forEach((wrap) => {
    let skillsBlock = wrap.querySelector(".skills__block");
    let skillsList = wrap.querySelector(".skills__list");
    skillsBlock.addEventListener("click", () => {
        if (skillsBlock.classList.contains("skills__block_clicked")) {
            skillsList.style.display = "none";
            skillsBlock.classList.remove("skills__block_clicked");
        } else {
            skillsList.style.display = "block";
            skillsBlock.classList.add("skills__block_clicked");
        }
    });
});

// form

const formContainer = document.querySelector(".form__container"),
    formData = document.querySelector(".form__data"),
    contactButton = document.querySelector(".hero__contact"),
    successWindow = document.querySelector(".form__success-window"),
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
