document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".time-picker-wrapper");
  const customInput = document.querySelector(".input__time");
  const nativeInput = document.querySelector(".time-native");

  nativeInput.addEventListener("change", function () {
    if (this.value) {
      const [hours, minutes] = this.value.split(":");
      customInput.value = `${hours}:${minutes}`;
    } else {
      customInput.value = "";
    }
  });

  wrapper.addEventListener("click", function () {
    nativeInput.showPicker();
    customInput.focus();
  });

  customInput.addEventListener("focus", function () {
    this.style.border = "2px solid #72A479";
    this.style.boxShadow = "0px 0px 0px 7px rgba(34, 182, 42, 0.2)";
  });

  customInput.addEventListener("blur", function () {
    this.style.border = "2px solid transparent";
    this.style.boxShadow = "none";
  });
});
