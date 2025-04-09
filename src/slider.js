// JavaScript
document.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth <= 768) {
    const swiper = new Swiper('.slider-container', {
      slidesPerView: 'auto',
      freeMode: true,
      mousewheel: {
        forceToAxis: true,
      },
      touchStartPreventDefault: false,
      resistanceRatio: 0,
      grabCursor: true,
      preventInteractionOnTransition: true,
      on: {
        init: function() {
          this.enable();
        }
      }
    });
    
    // Включаем обработку касаний
    document.querySelector('.slider-container').addEventListener('touchstart', function(e) {
      e.preventDefault();
    }, { passive: false });
  }
});