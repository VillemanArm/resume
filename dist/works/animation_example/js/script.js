const burger = document.querySelector('.burger');
const line1 = document.querySelector('.burger__line:nth-child(1)');
const line2 = document.querySelector('.burger__line:nth-child(2)');
const line3 = document.querySelector('.burger__line:nth-child(3)');

burger.addEventListener('click', (e) => {
    if (!line1.classList.contains('burger__line-animation1')) {

        line1.classList.add('burger__line-animation1')
        line2.classList.add('burger__line-animation2')
        line3.classList.add('burger__line-animation3')

    } else {
        
        line1.classList.add('burger__line-animation-reverse1')
        line2.classList.add('burger__line-animation-reverse2')
        line3.classList.add('burger__line-animation-reverse3')
        
        setTimeout(() => {
            line1.classList.remove('burger__line-animation1')
            line1.classList.remove('burger__line-animation-reverse1')
            line2.classList.remove('burger__line-animation2')
            line2.classList.remove('burger__line-animation-reverse2')
            line3.classList.remove('burger__line-animation3')
            line3.classList.remove('burger__line-animation-reverse3')
            void line2.offsetWidth 
        }, 800)                   
    }   
})