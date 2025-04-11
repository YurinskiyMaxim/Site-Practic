function generateNutrition() {
    return {
        proteins: Math.floor(Math.random() * 20) * 5,
        fats: Math.floor(Math.random() * 20) * 5,
        carbs: Math.floor(Math.random() * 20) * 5,
        kcal: Math.floor(Math.random() * 40) * 5 + 500
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    
    if(product) {
        document.querySelector('.kartochka--img img').src = product.image;
        document.querySelector('.kartochka__name--description li:first-child').textContent = product.name;
        document.querySelector('.description2').textContent = product.description;
        document.querySelector('.weight').textContent = `Вес: ${product.weight}`;
        document.querySelector('.price').textContent = `${product.price} ₽`;

        const nutrition = generateNutrition();
        const nutritionHTML = `
            <div class="compound">
                <ul class="compound__name">
                    <li>Белки</li>
                    <li>Жиры</li>
                    <li>Углеводы</li>
                    <li>Ккал</li>
                </ul>
                <ul class="compound__num">
                    <li>${nutrition.proteins}г</li>
                    <li>${nutrition.fats}г</li>
                    <li>${nutrition.carbs}г</li>
                    <li>${nutrition.kcal}</li>
                </ul>
            </div>
        `;
        document.querySelector('.nutrition-container').innerHTML = nutritionHTML;
    }

    document.querySelector('.go_back').addEventListener('click', () => {
        window.history.back();
    });
});