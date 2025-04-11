const swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  breakpoints: {
    1119: {
      slidesPerColumn: 2,
    },
  },
  pagination: {
    el: ".swiper-pagination",
  },
});


document.addEventListener('DOMContentLoaded', function() {
  new Swiper('.mySwiper', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      breakpoints: {
          768: {
              slidesPerView: 3,
              spaceBetween: 30
          },
          1024: {
              slidesPerView: 4,
              spaceBetween: 40
          }
      }
  });
});