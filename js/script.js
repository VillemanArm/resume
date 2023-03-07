const worksWebpages = document.querySelector(".works__webpages");
const worksList = document.querySelector(".works__list");
const worksListItem = document.querySelector(".works__list-item");

worksWebpages.addEventListener("click", () => {
    worksList.style.display = "block";
});
