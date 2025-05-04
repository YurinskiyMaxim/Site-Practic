document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelector(".phone-field");
  const countryCode = document.querySelector(".country-code");
  const nameInput = document.querySelector(".konkact_info__input1");

  const phoneMask = IMask(phoneInput, {
    mask: "(000) 000-00-00",
    lazy: false,
    placeholderChar: " ",
  });

  countryCode.addEventListener("change", () => {
    phoneMask.updateOptions({
      mask: `(000) 000-00-00`,
    });
    phoneMask.value = "";
  });

  if (nameInput) {
    nameInput.addEventListener("input", function (e) {
      this.value = this.value.replace(/[^A-Za-zА-Яа-яЁё\s\-]/g, "");
      if (this.value.length > 0) {
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
      }
    });
  }
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

  const checkbox = document.querySelector('input[name="agree"]');
  const submitButton = document.querySelector(".submit-order");

  function updateButtonState() {
    submitButton.disabled = !checkbox.checked;
  }

  updateButtonState();
  checkbox.addEventListener("change", updateButtonState);

  const deliveryType = document.querySelectorAll('input[name="radio1"]');
  const paymentType = document.querySelectorAll('input[name="radio2"]');
  const deliveryTime = document.querySelectorAll('input[name="radio3"]');
  const addressContainer = document.createElement("div");
  const changeContainer = document.createElement("div");
  const timePickerContainer = document.createElement("div");
  const timeContainer = document.querySelector(".container3");
  const cardPaymentContainer = document.createElement("div");
  const deliveryInfoSection = document.querySelector(".dostavka_info");

  function createAddressFields() {
    return `
      <div class="dostavka__adres">Адрес доставки</div>
      <div class="dostavka__adres--all_inputs">
          <div class="dostavka__adres--inputs1">
              <div class="dostavka__adres--inputs1-1-cont">
                  <input type="text" placeholder="Укажите улицу*" 
                         pattern="[A-Za-zА-Яа-яЁё\s\-]+" 
                         title="Только буквы и дефисы" required>
                  <div class="error-message"></div>
              </div>
              <div class="dostavka__adres--inputs1-2-cont">
                  <input type="text" placeholder="Номер дома*" 
                         pattern="\d+[A-Za-zА-Яа-я]?" 
                         title="Цифры и буквы (например: 14к2)" required>
                  <div class="error-message"></div>
              </div>
          </div>
          <div class="dostavka__adres--inputs2">
              <div class="dostavka__adres--inputs2-1-cont">
                  <input type="text" placeholder="№ квартиры/офиса" 
                         pattern="[\d\-]+">
              </div>
              <div class="dostavka__adres--inputs2-2-cont">
                  <input type="text" placeholder="Подъезд" pattern="\d+">
              </div>
              <div class="dostavka__adres--inputs2-3-cont">
                  <input type="text" placeholder="Этаж" pattern="\d+">
              </div>
          </div>
          <div class="dostavka__adres--inputs3-1-cont">
              <input class="dostavka__adres--inputs3-1" type="text" 
                     placeholder="Комментарий" maxlength="200">
          </div>
      </div>`;
  }

  function handleDeliveryChange() {
    const isDelivery = document.querySelector(
      'input[name="radio1"][value="now"]'
    ).checked;

    if (isDelivery) {
      const parser = new DOMParser();
      const addressElements = parser.parseFromString(
        createAddressFields(),
        "text/html"
      ).body;
      addressContainer.replaceChildren(...addressElements.childNodes);
      timePickerContainer.innerHTML = `
        <div class="time-picker-wrapper">
          <input type="text" class="input__time" placeholder="Укажите время" readonly>
          <input type="time" class="time-native">
        </div>
      `;
    } else {
      addressContainer.innerHTML = `
        <div class="dostavka__adres">Выберите ресторан</div>
        <div class="restaurant-select">
          <select id="restaurant-select" required>
            <option value="">-- выберите ресторан --</option>
            <option value="restaurant1">ул. Ленина, 10</option>
            <option value="restaurant2">пр. Мира, 25</option>
          </select>
          <div class="error-message"></div>
        </div>
      `;
      timePickerContainer.innerHTML = "";
    }
    const houseInput = document.querySelector('[placeholder="Номер дома*"]');
    if (houseInput) {
      houseInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^\d]/g, "");
      });
    }

    const apartmentInput = document.querySelector(
      '[placeholder="№ квартиры/офиса"]'
    );
    if (apartmentInput) {
      apartmentInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^\d]/g, "");
      });
    }

    const entranceInput = document.querySelector('[placeholder="Подъезд"]');
    if (entranceInput) {
      entranceInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^\d]/g, "");
      });
    }

    const floorInput = document.querySelector('[placeholder="Этаж"]');
    if (floorInput) {
      floorInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^\d]/g, "");
      });
    }

    initTimePicker();
    setTimeout(() => {
      const streetInput = document.querySelector(
        '[placeholder="Укажите улицу*"]'
      );
      if (streetInput) {
        streetInput.addEventListener("input", function () {
          this.value = this.value.replace(/[^A-Za-zА-Яа-яЁё\s\-]/g, "");
        });
      }

      const houseInput = document.querySelector('[placeholder="Номер дома*"]');
      if (houseInput) {
        houseInput.addEventListener("input", function () {
          this.value = this.value.replace(/[^\dA-Za-zА-Яа-я]/g, "");
        });
      }
    }, 0);
  }

  function handlePaymentChange() {
    const paymentValue = document.querySelector(
      'input[name="radio2"]:checked'
    ).value;

    changeContainer.innerHTML = "";
    cardPaymentContainer.innerHTML = "";

    if (paymentValue === "cash") {
      changeContainer.innerHTML = `
        <div class="change_with--cont">
            <input type="number" placeholder="Сдача с*" required>
            <div class="error-message"></div>
        </div>`;
    } else if (paymentValue === "online") {
      cardPaymentContainer.innerHTML = `
        <div class="card-payment-fields">
          <div class="card-number-cont">
            <input type="text" placeholder="Номер карты*" class="card-input" required maxlength="19">
            <div class="error-message"></div>
          </div>
          <div class="card-details-cont">
            <div>
              <input type="text" placeholder="ММ/ГГ*" class="card-input" required maxlength="5">
              <div class="error-message"></div>
            </div>
            <div>
              <input type="text" placeholder="CVV*" class="card-input" required maxlength="4">
              <div class="error-message"></div>
            </div>
          </div>
        </div>`;
    }
    const cardNumberInput = document.querySelector(
      '[placeholder="Номер карты*"]'
    );
    if (cardNumberInput) {
      cardNumberInput.addEventListener("input", function () {
        // Удаляем все нецифровые символы
        this.value = this.value.replace(/\D/g, "");

        // Добавляем пробелы через каждые 4 цифры
        this.value = this.value.replace(/(\d{4})(?=\d)/g, "$1 ");
      });
    }
    setTimeout(() => {
      const changeInput = document.querySelector(".change_with--cont input");
      if (changeInput) {
        changeInput.addEventListener("input", function () {
          this.value = this.value.replace(/\D/g, "");
        });
      }

      document.querySelectorAll(".card-input").forEach((input) => {
        if (input.placeholder === "CVV*") {
          input.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").slice(0, 4);
          });
        }
        const cardDateInput = document.querySelector('[placeholder="ММ/ГГ*"]');
        if (cardDateInput) {
          cardDateInput.addEventListener("input", function (e) {
            let value = this.value.replace(/\D/g, ""); // Удаляем все нецифровые символы

            // Ограничиваем длину до 4 цифр
            if (value.length > 4) {
              value = value.substring(0, 4);
            }

            // Добавляем слеш после первых 2 цифр
            if (value.length > 2) {
              value = value.substring(0, 2) + "/" + value.substring(2);
            }

            this.value = value;

            // Валидация в реальном времени
            if (value.length === 5) {
              // MM/YY (5 символов включая /)
              const [month, year] = value.split("/");
              const currentYear = new Date().getFullYear() % 100;
              const currentMonth = new Date().getMonth() + 1;

              if (parseInt(month) > 12 || parseInt(month) < 1) {
                this.classList.add("invalid");
              } else if (
                parseInt(year) < currentYear ||
                (parseInt(year) === currentYear &&
                  parseInt(month) < currentMonth)
              ) {
                this.classList.add("invalid");
              } else {
                this.classList.remove("invalid");
              }
            } else {
              this.classList.remove("invalid");
            }
          });

          // Добавляем обработчик для удаления символов
          cardDateInput.addEventListener("keydown", function (e) {
            if (e.key === "Backspace" && this.value.length === 3) {
              this.value = this.value.substring(0, 2);
              e.preventDefault(); // Предотвращаем удаление слеша
            }
          });
        }
      });
    }, 0);
  }

  function initTimePicker() {
    const timeNativeInput = document.querySelector(".time-native");
    const timeInput = document.querySelector(".input__time");

    if (timeNativeInput && timeInput) {
      timeNativeInput.addEventListener("change", (e) => {
        const time = e.target.value;
        const [hours, minutes] = time.split(":");
        timeInput.value = `${hours}:${minutes}`;
      });

      timeInput.addEventListener("click", () => {
        timeNativeInput.showPicker();
      });
    }
  }

  function handleTimeChange() {
    const isNow = document.querySelector(
      'input[name="radio3"][value="now"]'
    ).checked;

    if (!isNow) {
      timePickerContainer.innerHTML = `
        <div class="time-picker-wrapper">
          <input type="text" class="input__time" placeholder="Укажите время" readonly required>
          <input type="time" class="time-native">
          <div class="error-message"></div>
        </div>
      `;
      initTimePicker();
    } else {
      timePickerContainer.innerHTML = "";
    }
  }

  function validateForm() {
    let isValid = true;
    const requiredFields = document.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      const error = field.parentElement.querySelector(".error-message");

      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("invalid");
        if (error) {
          error.textContent = "Обязательное поле";
          error.style.display = "block";
        }
      } else {
        if (
          field.classList.contains("phone-field") &&
          !validatePhone(field.value)
        ) {
          isValid = false;
          field.classList.add("invalid");
          if (error) {
            error.textContent = "Введите корректный номер телефона";
            error.style.display = "block";
          }
        } else {
          field.classList.remove("invalid");
          if (error) error.style.display = "none";
        }
      }
      if (
        document.querySelector('input[name="radio1"][value="now"]')?.checked
      ) {
        const street = document.querySelector(
          ".dostavka__adres--inputs1-1-cont input"
        );
        const house = document.querySelector(
          ".dostavka__adres--inputs1-2-cont input"
        );

        [street, house].forEach((field) => {
          const error = field.parentElement.querySelector(".error-message");
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add("invalid");
            error.textContent = "Обязательное поле";
            error.style.display = "block";
          } else {
            field.classList.remove("invalid");
            error.style.display = "none";
          }
        });
      }
    });

    const personsInput = document.querySelector(".counter .value");
    if (personsInput) {
      const personsValue = parseInt(personsInput.value);
      if (personsValue < 1 || personsValue > 8) {
        isValid = false;
        personsInput.classList.add("invalid");
        const error =
          personsInput.parentElement.querySelector(".error-message");
        if (error) {
          error.textContent = "Укажите от 1 до 8 персон";
          error.style.display = "block";
        }
      }
    }

    // Валидация ресторана при самовывозе
    if (
      document.querySelector('input[name="radio1"][value="pickup"]')?.checked
    ) {
      const restaurantSelect = document.querySelector("#restaurant-select");
      if (!restaurantSelect?.value) {
        isValid = false;
        restaurantSelect.classList.add("invalid");
        const error =
          restaurantSelect.parentElement.querySelector(".error-message");
        if (error) {
          error.textContent = "Выберите ресторан";
          error.style.display = "block";
        }
      }
    }

    // Валидация сдачи при оплате наличными
    if (
      document.querySelector('input[name="radio2"]:checked')?.value === "cash"
    ) {
      const changeInput = document.querySelector(".change_with--cont input");
      if (!changeInput?.value) {
        isValid = false;
        changeInput.classList.add("invalid");
        const error = changeInput.parentElement.querySelector(".error-message");
        if (error) {
          error.textContent = "Укажите сумму";
          error.style.display = "block";
        }
      }
    }

    // Валидация времени доставки
    if (
      document.querySelector('input[name="radio3"][value="later"]')?.checked
    ) {
      const timeInput = document.querySelector(".input__time");
      if (!timeInput?.value) {
        isValid = false;
        timeInput.classList.add("invalid");
        const error = timeInput.parentElement.querySelector(".error-message");
        if (error) {
          error.textContent = "Укажите время доставки";
          error.style.display = "block";
        }
      }
    }
    const phoneInput = document.querySelector(".phone-field");
    const phoneError =
      phoneInput?.parentElement.querySelector(".error-message");

    if (phoneInput && phoneError) {
      if (!phoneInput.value.trim()) {
        isValid = false;
        phoneInput.classList.add("invalid");
        phoneError.textContent = "Обязательное поле";
        phoneError.style.display = "block";
      } else if (!validatePhone(phoneInput.value)) {
        isValid = false;
        phoneInput.classList.add("invalid");
        phoneError.textContent = "Введите корректный номер телефона";
        phoneError.style.display = "block";
      } else {
        phoneInput.classList.remove("invalid");
        phoneError.style.display = "none";
      }
    }

    return isValid;
  }

  function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, "");
    const countryCode = document.querySelector(".country-code")?.value || "7";

    const lengthRules = {
      7: 10,
      1: 11,
      44: 12,
    };

    return cleaned.length === lengthRules[countryCode];
  }

  function validateCardNumber(number) {
    const cleaned = number.replace(/\s+/g, "");
    if (!/^\d{13,19}$/.test(cleaned)) return false;

    let sum = 0;
    for (let i = 0; i < cleaned.length; i++) {
      let digit = parseInt(cleaned[i]);
      if ((cleaned.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }

  function validateCardDate(date) {
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(date)) return false;

    const [month, year] = date.split("/");
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (parseInt(year) < currentYear) return false;
    if (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      return false;

    return true;
  }

  function validateCardCVV(cvv) {
    return /^[0-9]{3,4}$/.test(cvv);
  }

  function init() {
    deliveryInfoSection.appendChild(addressContainer);
    document.querySelector(".dostavka__payment").appendChild(changeContainer);
    document
      .querySelector(".dostavka__payment")
      .appendChild(cardPaymentContainer);
    timeContainer.appendChild(timePickerContainer);

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

    document
      .querySelector(".submit-order")
      .addEventListener("click", async (e) => {
        e.preventDefault();

        if (!validateForm()) {
          alert("Пожалуйста, заполните все обязательные поля корректно");
          return;
        }

        const cart = {
          getTotal: () => {
            const items = JSON.parse(localStorage.getItem("cart")) || [];
            return items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
          },
        };

        const orderData = {
          name: document.querySelector(".konkact_info__input1").value,
          phone: document.querySelector(".phone-field").value,
          deliveryType: document.querySelector('input[name="radio1"]:checked')
            .value,
          paymentMethod: document.querySelector('input[name="radio2"]:checked')
            .value,
          deliveryTime:
            document.querySelector(".input__time")?.value || "Как можно скорее",
          persons: document.querySelector(".counter .value").value,
          callback: document.querySelector('input[name="callback"]:checked')
            ?.value,
          restaurant: document.querySelector("#restaurant-select")?.value,
          items: JSON.parse(localStorage.getItem("cart")) || [],
          total: cart.getTotal(),
        };

        try {

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error: ${response.status} — ${errorText}`);
          }

          showSuccessMessage();
        } catch {
        }
      });
  }
  function showSuccessMessage() {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5); /* Полупрозрачный черный фон */
    z-index: 1000;
  `;

    const modal = document.createElement("div");
    modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #2d2d2d; /* Темно-серый фон окна */
    color: white; /* Белый текст */
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    z-index: 1001;
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
  `;

    modal.innerHTML = `
    <h3 style="margin-bottom: 1rem; color: #fff;">Заказ оформлен успешно!</h3>
    <button style="
      padding: 8px 20px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">OK</button>
  `;

    const closeModal = () => {
      document.body.removeChild(overlay);
      document.body.removeChild(modal);
    };

    modal.querySelector("button").addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
  }

  document.querySelector(".submit-order").addEventListener("click", (e) => {
    e.preventDefault();

    if (validateForm()) {
      showSuccessMessage();
    } else {
      alert("Заполните все обязательные поля корректно");
    }
  });

  init();
});

const style = document.createElement("style");
style.textContent = `
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
}

.success-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  z-index: 1001;
  text-align: center;
}

.success-icon {
  width: 64px;
  height: 64px;
  color: #4CAF50;
}

.close-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
}
`;
document.head.appendChild(style);