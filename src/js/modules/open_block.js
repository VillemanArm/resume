const openBlock = () => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);


    const skillsBlockWraps = $$(".skills__block-wrap");
    const worksBlockWrap = $('.works__block-wrap');
    const contacts = document.querySelector('.contacts')
    const works = document.querySelector('.works')

    //openinig blocks

    worksBlockWrap.addEventListener("click", () => {
        worksBlockWrap.classList.toggle('block-clicked')
        if (worksBlockWrap.classList.contains('block-clicked') && window.innerWidth > 768) 
        {
            contacts.style.marginTop = "4rem";
        } else
        {
            contacts.style.marginTop = "16rem";
        }
    });


    skillsBlockWraps.forEach((wrap) => {
        wrap.querySelector('div').addEventListener("click", () => {
                wrap.classList.toggle('block-clicked')
                if (wrap.classList.contains('block-clicked') && window.innerWidth > 768) 
                {
                    works.style.marginTop = "4rem";
                } else
                {
                    works.style.marginTop = "16rem";
                }
            });
    });
}

export default openBlock