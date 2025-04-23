document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (e) {
    if (e.target.closest(".time-picker-wrapper")) {
      const nativeInput = e.target.closest(".time-picker-wrapper").querySelector(".time-native");
      nativeInput.showPicker();
      e.target.closest(".input__time").focus();
    }
  });
});
