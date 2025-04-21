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
    const isCash =
      document.querySelector('input[name="radio2"]:checked').value === "cash";
    changeContainer.innerHTML = isCash
      ? `
          <div class="change_with--cont">
              <input type="number" placeholder="Сдача с">
          </div>`
      : "";
  }

  function handleTimeChange() {
    const isNow = document.getElementById("first").checked;
    timePickerContainer.style.display = isNow ? "none" : "block";
  }

  function init() {
    document.querySelector(".dostavka_info").appendChild(addressContainer);
    document.querySelector(".dostavka__payment").appendChild(changeContainer);
    document.querySelector(".container3").appendChild(timePickerContainer);

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

  init();
});
