document.addEventListener('DOMContentLoaded', function() {
    // Генерация значений БЖУ кратных 5
    const generateNutrition = () => ({
        proteins: Math.floor(Math.random() * 20) * 5,
        fats: Math.floor(Math.random() * 20) * 5,
        carbs: Math.floor(Math.random() * 20) * 5,
        kcal: Math.floor(Math.random() * 40) * 5 + 500
    });

    // Получение данных товара
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    
    if(product) {
        // Заполнение основных данных
        const elements = {
            image: document.querySelector('.kartochka--img img'),
            name: document.querySelector('.kartochka__name--description li:first-child'),
            description: document.querySelector('.description2'),
            weight: document.querySelector('.weight'),
            price: document.querySelector('.price'),
            nutritionContainer: document.querySelector('.nutrition-container')
        };

        elements.image.src = product.image || '';
        elements.image.alt = product.name || 'Изображение товара';
        elements.name.textContent = product.name || 'Название товара';
        elements.description.textContent = product.description || 'Описание товара';
        elements.weight.textContent = `Вес: ${product.weight || '0г'}`;
        elements.price.textContent = `${parseInt(product.price)?.toLocaleString() || 0} ₽`;

        // Генерация и вставка БЖУ
        const nutrition = generateNutrition();
        elements.nutritionContainer.innerHTML = `
            <div class="compound">
                <ul class="compound__name">
                    ${['Белки', 'Жиры', 'Углеводы', 'Ккал'].map(item => 
                        `<li>${item}</li>`).join('')}
                </ul>
                <ul class="compound__num">
                    ${Object.values(nutrition).map(value => 
                        `<li>${value}${value === nutrition.kcal ? '' : 'г'}</li>`).join('')}
                </ul>
            </div>
        `;
    } else {
        console.error('Данные о товаре не найдены');
        window.location.href = '/'; // Перенаправление при отсутствии данных
    }

    // Обработчики событий
    document.querySelector('.go_back').addEventListener('click', () => history.back());

    document.querySelector('.kartochka__button').addEventListener('click', function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingIndex = cart.findIndex(item => item.id === product.id);

        if(existingIndex > -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Обновление счетчика корзины
        if(typeof updateCartCounter === 'function') {
            updateCartCounter();
        } else {
            console.warn('Функция updateCartCounter не определена');
        }
    });
});