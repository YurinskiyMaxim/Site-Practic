class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.updateCartCounters();
  }

  addItem(product) {
    const existing = this.items.find(item => item.id === product.id);
    
    if (existing) {
      // Увеличиваем количество только если не достигнут максимум
      if (existing.quantity < 8) {
        existing.quantity++;
      }
    } else {
      // Добавляем новый товар с количеством 1
      this.items.push({ 
        ...product, 
        quantity: 1 
      });
    }
    this.saveToStorage();
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveToStorage();
  }

  updateQuantity(id, newQuantity) {
    const item = this.items.find(item => item.id === id);
    
    if (item) {
      // Жесткое ограничение значений от 1 до 8
      newQuantity = Math.max(1, Math.min(8, newQuantity));
      item.quantity = newQuantity;
      this.saveToStorage();
    }
  }

  saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.updateCartCounters();
    
    // Автоматический перерендер корзины если находимся на странице basket.html
    if (document.querySelector('.products')) {
      renderBasket();
    }
  }

  getTotalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateCartCounters() {
    const total = this.getTotalItems();
    document.querySelectorAll('.basket__number').forEach(el => {
      el.textContent = total;
    });
  }
}

const cart = new Cart();

// Общая логика для всех страниц
document.addEventListener('DOMContentLoaded', () => {
  // Обработка кликов на кнопки "В корзину"
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.swiper-slide__button')) {
      const button = e.target.closest('.swiper-slide__button');
      const productData = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseInt(button.dataset.price),
        image: button.dataset.image,
        weight: button.dataset.weight,
        description: button
          .closest('.swiper-slide')
          .querySelector('.swiper__description--second').textContent
      };
      
      cart.addItem(productData);
    }
  });
});

// Логика для страницы корзины
function renderBasket() {
  const container = document.querySelector('.products');
  if (!container) return;

  container.innerHTML = '';

  if (cart.items.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <img src="./public/IMG/empty-cart.svg" alt="Пустая корзина">
        <p>Ваша корзина пуста</p>
      </div>
    `;
    return;
  }

  // Рендер товаров
  cart.items.forEach((item, index) => {
    const itemHTML = `
      <div class="products_${index + 1}" data-id="${item.id}">
        <img class="products__img" src="${item.image}" alt="${item.name}">
        <div class="products__full">
          <ul class="products__list">
            <li class="products__list-item1">${item.name}</li>
            <li class="products__list-item2">${item.description}</li>
          </ul>
          <div class="products__full-list">
            <div class="counter">
              <button class="mines" data-id="${item.id}"></button>
              <input class="value" 
                     type="number" 
                     value="${item.quantity}" 
                     min="1" 
                     max="8">
              <button class="plus" data-id="${item.id}"></button>
            </div>
            <div class="prise">${item.price * item.quantity} ₽</div>
            <div class="delete">
              <button class="delete__item" data-id="${item.id}">
                <img class="delete__item--img" 
                     src="./public/icons/plus.svg" 
                     alt="Удалить">
              </button>
            </div>
          </div>
        </div>
      </div>
      ${index < cart.items.length - 1 ? '<div class="products__seporator"></div>' : ''}
    `;
    
    container.insertAdjacentHTML('beforeend', itemHTML);
  });

  // Функция обновления цены
  const updatePrice = (id) => {
    const item = cart.items.find(item => item.id === id);
    if (item) {
      const priceElement = container.querySelector(`[data-id="${id}"] .prise`);
      if (priceElement) {
        priceElement.textContent = `${item.price * item.quantity} ₽`;
      }
    }
  };

  // Общий обработчик событий
  container.addEventListener('click', (e) => {
    const target = e.target;
    
    // Уменьшение количества
    if (target.closest('.mines')) {
      const button = target.closest('.mines');
      const input = button.nextElementSibling;
      const newValue = Math.max(1, parseInt(input.value) - 1);
      
      input.value = newValue;
      cart.updateQuantity(button.dataset.id, newValue);
      updatePrice(button.dataset.id);
    }
    
    // Увеличение количества
    if (target.closest('.plus')) {
      const button = target.closest('.plus');
      const input = button.previousElementSibling;
      const newValue = Math.min(8, parseInt(input.value) + 1);
      
      input.value = newValue;
      cart.updateQuantity(button.dataset.id, newValue);
      updatePrice(button.dataset.id);
    }
    
    // Удаление товара
    if (target.closest('.delete__item')) {
      const button = target.closest('.delete__item');
      cart.removeItem(button.dataset.id);
    }
  });

  // Обработчик ручного ввода
  container.addEventListener('input', (e) => {
    if (e.target.classList.contains('value')) {
      const input = e.target;
      const id = input.closest('[data-id]').dataset.id;
      let newValue = Math.max(1, Math.min(8, parseInt(input.value) || 1));
      
      input.value = newValue;
      cart.updateQuantity(id, newValue);
      updatePrice(id);
    }
  });
}

// Инициализация корзины
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.products')) {
    renderBasket();
  }
});