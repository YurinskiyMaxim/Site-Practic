class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.items = this.items.filter(item => item && item.id && item.name && item.price && item.image && item.weight && item.description);
    this.updateCartCounters();
  }

  isProductValid(product) {
    const requiredFields = ['id', 'name', 'price', 'image', 'weight', 'description'];
    const isValid = requiredFields.every(field => {
      if (field === 'price') return Number.isInteger(product[field]) && product[field] > 0;
      return product[field] !== undefined && product[field] !== null && String(product[field]).trim() !== '';
    });
    if (!isValid) console.error('Invalid product:', product);
    return isValid;
  }

  addItem(product) {
    if (!this.isProductValid(product)) return;
    const existing = this.items.find(item => item.id === product.id);
    existing ? existing.quantity < 8 && existing.quantity++ : this.items.push({...product, quantity: 1});
    this.saveToStorage();
  }

  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveToStorage();
  }

  updateQuantity(id, newQuantity) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantity = Math.max(1, Math.min(8, newQuantity));
      this.saveToStorage();
    }
  }

  saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.updateCartCounters();
    document.querySelector('.products') && renderBasket();
  }

  getTotalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  updateCartCounters() {
    const total = this.getTotalItems();
    document.querySelectorAll('.basket__number, .basket-counter, .basket2-counter').forEach(el => {
      el.textContent = total;
    });
    
    document.querySelector('.basket__colvo') && (document.querySelector('.basket__colvo').textContent = 
      `(в корзине ${total} товар${this.getRussianPlural(total)})`);
  }

  getRussianPlural(number) {
    const cases = [2, 0, 1, 1, 1, 2];
    return number % 100 > 4 && number % 100 < 20 ? 'ов' : cases[(number % 10 < 5) ? number % 10 : 5];
  }
}

const cart = new Cart();

// Обновление счетчика корзины
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelectorAll('.basket-counter, .basket__number').forEach(element => {
      element.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  });
}

// Инициализация корзины
document.addEventListener('DOMContentLoaded', updateCartCounter);

function showEmptyCartModal() {
  if (document.getElementById('emptyCartModal')) return;

  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
    background: linear-gradient(0deg, rgba(33, 31, 32, 0.9), rgba(68, 64, 63, 0.9));
    backdrop-filter: blur(2px);
  `;

  const modal = document.createElement('div');
  modal.id = 'emptyCartModal';
  modal.style.cssText = `
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  `;

  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: linear-gradient(135deg, rgb(73, 69, 68), rgb(80, 75, 74));
    padding: 52px 102px 63px 102px;
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    width: 90%;
    position: relative;
    pointer-events: auto;
  `;

  const icon = document.createElement('img');
  icon.src = './public/icons/empty_basket.svg';
  icon.alt = 'Пустая корзина';
  icon.style.cssText = 'width: 100px; height: 100px; margin-bottom: 20px;';

  const text = document.createElement('p');
  text.textContent = 'КОРЗИНА ПУСТАЯ';
  text.style.cssText = 'font-size: 30px; color: #FFFFFF; font-weight: bold;';

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Посмотреть меню';
  closeButton.style.cssText = `
    margin-top: 42px;
    padding: 17px 35px;
    background: linear-gradient(135deg, rgb(97, 137, 103), rgb(114, 164, 121));
    color: #FFFFFF;
    font-weight: bold;
    font-size: 14px;
    border: none;
    border-radius: 10px;
    width: auto;
    height: auto;
    cursor: pointer;
  `;

  modalContent.append(icon, text, closeButton);
  modal.appendChild(modalContent);
  document.body.append(overlay, modal);
  document.body.style.overflow = 'hidden';

  const closeHandler = () => {
    document.body.style.overflow = 'auto';
    overlay.remove();
    modal.remove();
  };

  closeButton.addEventListener('click', () => {
    const isMainPage = window.location.pathname === '/' || 
                      window.location.pathname.endsWith('index.html');
    
    if (isMainPage) {
      window.scrollBy({
        top: 590,
        behavior: 'smooth'
      });
    } else {
      window.location.href = `${window.location.origin}/?scroll=590`;
    }
    closeHandler();
  });

  overlay.addEventListener('click', closeHandler);
  modal.addEventListener('click', e => e.target === modal && closeHandler());
}

document.addEventListener('DOMContentLoaded', () => {
  // Обработка параметра скролла
  const urlParams = new URLSearchParams(window.location.search);
  const scrollValue = urlParams.get('scroll');
  
  if (scrollValue) {
    window.scrollBy({
      top: parseInt(scrollValue),
      behavior: 'smooth'
    });
    
    // Очищаем URL от параметра
    const cleanUrl = new URL(window.location);
    cleanUrl.searchParams.delete('scroll');
    window.history.replaceState({}, '', cleanUrl);
  }

  // Инициализация корзины
  cart.updateCartCounters();

  // Обработчик добавления в корзину
  document.body.addEventListener('click', e => {
    const button = e.target.closest('.swiper-slide__button');
    if (!button) return;
    
    const cardElement = button.closest('.swiper-slide');
    const descriptionElement = cardElement?.querySelector('.swiper__description--second');
    
    const productData = {
      id: button.dataset.id?.trim() || '',
      name: button.dataset.name?.trim() || '',
      price: parseInt(button.dataset.price),
      image: button.dataset.image?.trim() || '',
      weight: button.dataset.weight?.trim() || '',
      description: descriptionElement?.textContent?.trim() || 'Описание отсутствует'
    };

    if ([productData.id, productData.name, productData.image, productData.weight].every(Boolean) && !isNaN(productData.price)) {
      cart.addItem(productData);
    } else {
      console.error('Invalid product data:', productData);
    }
  });

  // Обработчик корзин
  const basketHandler = e => {
    if (cart.getTotalItems() === 0) {
      e.preventDefault();
      e.stopPropagation();
      showEmptyCartModal();
    } else {
      window.location.href = '/basket';
    }
  };

  document.querySelectorAll('.basket, .basket2, .basket *, .basket2 *').forEach(el => {
    el.addEventListener('click', basketHandler);
  });

  // Обработчики страницы корзины
  if (document.querySelector('.products')) {
    renderBasket();

    document.body.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.mines')) {
        const button = target.closest('.mines');
        const input = button.parentElement.querySelector('.value');
        cart.updateQuantity(button.dataset.id, parseInt(input.value) - 1);
      }
      if (target.closest('.plus')) {
        const button = target.closest('.plus');
        const input = button.parentElement.querySelector('.value');
        cart.updateQuantity(button.dataset.id, parseInt(input.value) + 1);
      }
      if (target.closest('.delete__item')) {
        cart.removeItem(target.closest('.delete__item').dataset.id);
      }
    });

    document.body.addEventListener('input', e => {
      if (e.target.classList.contains('value')) {
        const input = e.target;
        const newValue = Math.max(1, Math.min(8, parseInt(input.value) || 1));
        input.value = newValue;
        cart.updateQuantity(input.closest('[data-id]').dataset.id, newValue);
      }
    });
  }
});

function renderBasket() {
  const container = document.querySelector('.products');
  if (!container) return;

  container.innerHTML = cart.items.length ? '' : `
    <div class="empty-cart">
      <img src="./public/icons/empty_basket.svg" alt="Пустая корзина">
      <p>Ваша корзина пуста</p>
    </div>
  `;

  cart.items.forEach((item, index) => {
    container.insertAdjacentHTML('beforeend', `
      <div class="products_${index + 1} products_all" data-id="${item.id}">
        <img class="products__img" src="${item.image}" alt="${item.name}">
        <div class="products__full">
          <ul class="products__list">
            <li class="products__list-item1">${item.name}</li>
            <li class="products__list-item2">${item.description}</li>
          </ul>
          <div class="products__full-list">
            <div class="counter">
              <button class="mines" data-id="${item.id}" ${item.quantity === 1 ? 'disabled' : ''}></button>
              <input class="value" type="number" value="${item.quantity}" min="1" max="8">
              <button class="plus" data-id="${item.id}" ${item.quantity === 8 ? 'disabled' : ''}></button>
            </div>
            <div class="prise">${(item.price * item.quantity).toLocaleString()} ₽</div>
            <div class="delete">
              <button class="delete__item" data-id="${item.id}">
                <img class="delete__item--img" src="./public/icons/plus.svg" alt="Удалить">
              </button>
            </div>
          </div>
        </div>
      </div>
      ${index < cart.items.length - 1 ? '<div class="products__seporator"></div>' : ''}
    `);
  });

  updateOrderSummary();
}

function updateOrderSummary() {
  const totalPrice = cart.getTotalPrice();
  const minOrder = 1500;
  const toFree = Math.max(0, minOrder - totalPrice);
  
  const totalElement = document.querySelector('.making-order__info--total--dop');
  const freeElement = document.querySelector('.making-order__text--for_free2');
  
  totalElement && (totalElement.textContent = `${totalPrice.toLocaleString()} ₽`);
  freeElement && (freeElement.textContent = `${toFree.toLocaleString()} ₽`);
}

