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

const form = document.querySelector(".form"),
    contactButton = document.querySelector(".hero__contact"),
    body = document.querySelector("body");

contactButton.addEventListener("click", () => {
    form.style.display = "block";
    body.style.overflow = "hidden";
});

form.addEventListener("click", (e) => {
    const isForm = e.target.closest(".form__window");

    if (!isForm) {
        form.style.display = "none";
        body.style.overflow = "auto";
    }
});