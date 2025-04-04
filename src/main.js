const slides = document.querySelectorAll('.swiper-slide__img0');
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
const go_back2 = document.querySelectorAll('.go_back2');
go_back2.forEach(go_back2 => {
    go_back2.addEventListener('click', () => {
        window.location.href='./index.html';
    })
})
const basket = document.querySelectorAll('.basket');
const basket2 = document.querySelectorAll('.basket2');
basket.forEach(basket => {
    basket.addEventListener('click', () => {
        window.location.href='./basket.html';
    })
})
basket2.forEach(basket2 => {
    basket2.addEventListener('click', () => {
        window.location.href='./basket.html';
    })
})
const index= document.querySelectorAll('.logo');
const index2= document.querySelectorAll('.bottom__logo');
const index3= document.querySelectorAll('.logo2');
index.forEach(index => {
    index.addEventListener('click', () => {
        window.location.href='./index.html';
    })
})
index2.forEach(index2 => {
    index2.addEventListener('click', () => {
        window.location.href='./index.html';
    })
})
index3.forEach(index3 => {
    index3.addEventListener('click', () => {
        window.location.href='./index.html';
    })
})
const backToTop = document.querySelector(".bottom__button" || ".");
backToTop.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});