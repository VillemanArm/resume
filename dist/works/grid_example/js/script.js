const footerLinksHeaders = document.querySelectorAll('.footer__links-header');

footerLinksHeaders.forEach((header) => {
    header.addEventListener('click', () => {
        if (window.innerWidth <= 780) {
            const list = header.closest('.footer__links').querySelector('ul');
            if (list.style.display === 'block') {
                list.style.display = 'none'
            } else {
                list.style.display = 'block'
            }
        }
    })    
})
