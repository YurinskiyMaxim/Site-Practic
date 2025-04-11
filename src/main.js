// Обработчик клика по карточкам товара
document.querySelectorAll('.swiper-slide').forEach(slide => {
  const img = slide.querySelector('img');
  const button = slide.querySelector('.swiper-slide__button');
  
  // Обработчик клика по изображению
  img.addEventListener('click', function() {
      const productData = {
          id: button.dataset.id,
          name: button.dataset.name,
          price: button.dataset.price,
          image: button.dataset.image,
          weight: button.dataset.weight,
          description: slide.querySelector('.swiper__description--second').textContent
      };
      
      localStorage.setItem('selectedProduct', JSON.stringify(productData));
      window.location.href = 'kartochka.html';
  });
});

const slides = document.querySelectorAll(".swiper-slide__img0");
slides.forEach((slide) => {
  slide.addEventListener("click", () => {
    window.location.href = "./Карточка.html";
  });
});

const go_back = document.querySelectorAll(".go_back");
go_back.forEach((go_back) => {
  go_back.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
});
const go_back2 = document.querySelectorAll(".go_back2");
go_back2.forEach((go_back2) => {
  go_back2.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
});
const basket = document.querySelectorAll(".basket");
const basket2 = document.querySelectorAll(".basket2");
basket.forEach((basket) => {
  basket.addEventListener("click", () => {
    window.location.href = "./basket.html";
  });
});
basket2.forEach((basket2) => {
  basket2.addEventListener("click", () => {
    window.location.href = "./basket.html";
  });
});
const index = document.querySelectorAll(".logo");
const index2 = document.querySelectorAll(".bottom__logo");
const index3 = document.querySelectorAll(".logo2");
index.forEach((index) => {
  index.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
});
index2.forEach((index2) => {
  index2.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
});
index3.forEach((index3) => {
  index3.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
});
const backToTop = document.querySelector(".bottom__button" || ".");
backToTop.addEventListener("click", function (event) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const go_to_kard = document.querySelectorAll(".to_choose_dish");
go_to_kard.forEach((go_to_kard) => {
  go_to_kard.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
});

const make__order = document.querySelectorAll(".make__order");
make__order.forEach((make__order) => {
  make__order.addEventListener("click", () => {
    window.location.href = "./make_order.html";
  });
});

const to_basket = document.querySelectorAll(".to_basket");
to_basket.forEach((to_basket) => {
  to_basket.addEventListener("click", () => {
    window.location.href = "./basket.html";
  });
});

const inputRadio1 = document.querySelectorAll('input[name="radio1"]');

inputRadio1.forEach((input) => {
  if (input.id === "first") {
    input.checked = true;
  }
});

const inputRadio2 = document.querySelectorAll('input[name="radio2"]');

inputRadio2.forEach((input) => {
  if (input.id === "first") {
    input.checked = true;
  }
});

const inputRadio3 = document.querySelectorAll('input[name="radio3"]');

inputRadio3.forEach((input) => {
  if (input.id === "first") {
    input.checked = true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const valueElement = counter.querySelector(".value");

    counter.querySelector(".mines").addEventListener("click", () => {
      valueElement.stepDown();
    });

    counter.querySelector(".plus").addEventListener("click", () => {
      valueElement.stepUp();
    });
  });
});
