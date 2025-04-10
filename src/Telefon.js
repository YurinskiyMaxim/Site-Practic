document.addEventListener('DOMContentLoaded', function() {
    const phoneContainer = document.getElementById('phoneContainer');
    const phoneField = document.querySelector('.phone-field');
    const countryCode = document.querySelector('.country-code');
    let mask;
  
    // Активация поля
    phoneContainer.addEventListener('click', function(e) {
      if (phoneField.readOnly) {
        phoneField.removeAttribute('readonly');
        phoneContainer.classList.add('active');
        initMask();
        phoneField.focus();
      }
    });
  
    // Инициализация маски
    function initMask() {
      const masks = {
        '7': '+7 (000) 000-00-00',
        '1': '+1 (000) 000-0000',
        '44': '+44 (0000) 000000',
        '49': '+49 0000 000000'
      };
  
      if(mask) mask.destroy();
      
      mask = IMask(phoneField, {
        mask: masks[countryCode.value],
        lazy: false,
        placeholderChar: '_'
      });
  
      phoneField.placeholder = mask.masked.placeholder;
    }
  
    // Смена кода страны
    countryCode.addEventListener('change', function() {
      if (mask) {
        initMask();
        phoneField.value = '';
      }
    });
  
    // Обработчик блюра
    phoneField.addEventListener('blur', function() {
      if (!mask.unmaskedValue) {
        phoneField.placeholder = 'Телефон*';
        phoneField.readOnly = true;
        phoneContainer.classList.remove('active');
        mask.destroy();
        mask = null;
      }
    });
  });