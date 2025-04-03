const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            window.location.href='./Карточка.html';
        })
    })

const go_back = document.querySelectorAll('.go_back');
go_back.forEach(go_back => {
    go_back.addEventListener('click', () => {
        window.location.href='./index.html';
    })
})