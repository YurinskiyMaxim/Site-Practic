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

document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.querySelector('input[name="agree"]');
  const counter = document.querySelector('input[name="0"]');
  const submitButton = document.querySelector(".submit-order");

  function updateButtonState() {
    submitButton.disabled = !checkbox.checked;
  }

  updateButtonState();

  checkbox.addEventListener("change", updateButtonState);
});

document.addEventListener("DOMContentLoaded", () => {
  const deliveryType = document.querySelectorAll('input[name="radio1"]');
  const paymentType = document.querySelectorAll('input[name="radio2"]');
  const deliveryTime = document.querySelectorAll('input[name="radio3"]');
  const timeNative = document.querySelector(".time-native");
  const inputTime = document.querySelector(".input__time");
  const addressContainer = document.createElement("div");
  const changeContainer = document.createElement("div");
  const timePickerContainer = document.createElement("div");
  const timeContainer = document.querySelector(".container3");
  const cardPaymentContainer = document.createElement("div");

  function createAddressFields() {
    return `
      <div class="dostavka__adres">Адрес доставки</div>
      <div class="dostavka__adres--all_inputs">
          <div class="dostavka__adres--inputs1">
              <div class="dostavka__adres--inputs1-1-cont">
                  <input type="text" placeholder="Укажите улицу*">
              </div>
              <div class="dostavka__adres--inputs1-2-cont">
                  <input type="number" placeholder="Номер дома*">
              </div>
          </div>
          <div class="dostavka__adres--inputs2">
              <div class="dostavka__adres--inputs2-1-cont">
                  <input type="number" placeholder="№ квартиры/офиса">
              </div>
              <div class="dostavka__adres--inputs2-2-cont">
                  <input type="number" placeholder="Подъезд">
              </div>
              <div class="dostavka__adres--inputs2-3-cont">
                  <input type="number" placeholder="Этаж">
              </div>
          </div>
          <div class="dostavka__adres--inputs3-1-cont">
              <input class="dostavka__adres--inputs3-1" type="text" placeholder="Комментарий">
          </div>
      </div>`;
  }

  function handleDeliveryChange() {
    const isDelivery = document.getElementById("first").checked;
    addressContainer.innerHTML = isDelivery ? createAddressFields() : "";
  }

  function handlePaymentChange() {
    const paymentValue = document.querySelector('input[name="radio2"]:checked').value;

    changeContainer.innerHTML = "";
    cardPaymentContainer.innerHTML = "";
  
    if (paymentValue === "cash") {
      changeContainer.innerHTML = `
        <div class="change_with--cont">
            <input type="number" placeholder="Сдача с">
        </div>`;
    } else if (paymentValue === "online") {
      cardPaymentContainer.innerHTML = `
        <div class="card-payment-fields">
          <div class="card-number-cont">
            <input type="text" placeholder="Номер карты*" class="card-input" required>
          </div>
          <div class="card-details-cont">
            <input type="text" placeholder="ММ/ГГ*" class="card-input" required>
            <input type="text" placeholder="CVV*" class="card-input" required>
          </div>
        </div>`;
    }
  }

  function handleTimeChange() {
    const isNow = document.querySelector('input[name="radio3"][value="now"]').checked;
    timePickerContainer.innerHTML = isNow
      ? ""
      : `
        <div class="time-picker-wrapper">
          <input type="text" class="input__time" placeholder="Укажите время" readonly>
          <input type="time" class="time-native">
        </div>
      `;
  }

  function init() {
    document.querySelector(".dostavka_info").appendChild(addressContainer);
    document.querySelector(".dostavka__payment").appendChild(changeContainer);
    document.querySelector(".container3").appendChild(timePickerContainer);
    document.querySelector(".dostavka__payment").appendChild(cardPaymentContainer);

    deliveryType.forEach((radio) =>
      radio.addEventListener("change", handleDeliveryChange)
    );
    paymentType.forEach((radio) =>
      radio.addEventListener("change", handlePaymentChange)
    );
    deliveryTime.forEach((radio) =>
      radio.addEventListener("change", handleTimeChange)
    );

    handleDeliveryChange();
    handlePaymentChange();
    handleTimeChange();
  }

  document.querySelector(".submit-order").addEventListener("click", async (e) => {
    e.preventDefault();

    let isValid = true;
    const requiredFields = document.querySelectorAll('[placeholder*="*"]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('invalid');
        const error = field.parentElement.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = 'Обязательное поле';
        if (!field.parentElement.querySelector('.error-message')) {
          field.parentElement.appendChild(error);
        }
      } else {
        field.classList.remove('invalid');
        const error = field.parentElement.querySelector('.error-message');
        if (error) error.remove();
      }
    });
  
    if (!isValid) {
      alert('Заполните все обязательные поля');
      return;
    }
  
    // Проверка данных карты для онлайн оплаты
    if (document.querySelector('input[name="radio2"]:checked').value === "online") {
      const cardNumber = document.querySelector('.card-input[placeholder="Номер карты*"]');
      const cardDate = document.querySelector('.card-input[placeholder="ММ/ГГ*"]');
      const cardCVV = document.querySelector('.card-input[placeholder="CVV*"]');
      
      if (!validateCard(cardNumber.value, cardDate.value, cardCVV.value)) {
        alert('Проверьте данные карты');
        return;
      }
    }

      const orderData = {
        name: document.querySelector(".konkact_info__input1").value,
        phone: document.querySelector(".phone-field").value,
        paymentMethod: document.querySelector('input[name="radio2"]:checked')
          .value,
        deliveryTime:
          document.querySelector(".input__time").value || "Как можно скорее",
        items: JSON.parse(localStorage.getItem("cart")),
        total: cart.getTotal(),
      };

      const smsMessage = `Новый заказ!\nТовары: ${orderData.items
        .map((i) => i.name)
        .join(", ")}\nСумма: ${orderData.total}₽\nВремя: ${
        orderData.deliveryTime
      }`;

      try {
        const response = await fetch("http://localhost:3000/send-sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: orderData.phone,
            message: smsMessage,
          }),
        });

        if (response.ok) {
          alert("Заказ оформлен! С вами свяжутся.");
          localStorage.removeItem("cart");
          window.location.href = "/";
        }
      } catch (error) {
        alert("Ошибка при оформлении заказа");
      }
    });
    function validateCard(number, date, cvv) {
      const dateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      const cvvRegex = /^[0-9]{3,4}$/;
      const numberRegex = /^[0-9]{13,19}$/;
      
      return numberRegex.test(number.replace(/ /g, '')) &&
             dateRegex.test(date) &&
             cvvRegex.test(cvv);
    }
  init();
});
