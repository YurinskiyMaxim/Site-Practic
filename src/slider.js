document.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth <= 992) {
    const swiper = new Swiper('.swiper-container', {
      freeMode: true,
      slidesPerView: 'auto',
      spaceBetween: 15,
      mousewheel: {
        forceToAxis: true,
      },
      touchEventsTarget: 'container',
      preventInteractionOnTransition: true,
      resistance: false,
    });
  }
});