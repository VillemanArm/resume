const openBlock = () => {
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
}

export default openBlock