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


