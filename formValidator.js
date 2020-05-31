class FormValidator {
  constructor(form) {
    this.form = form;
  }
  checkInputValidity(input, textError) {
    const valMessage = input.nextElementSibling;
    if (input.validity.tooShort) {
      valMessage.textContent = textError.length;
      return false;
    }
    if (input.validity.tooLong) {
      valMessage.textContent = textError.length;
      return false;
    }
    if (input.validity.valueMissing) {
      valMessage.textContent = textError.requiredField;
      return false;
    }
    if (input.validity.typeMismatch) {
      valMessage.textContent = textError.needLink;
      return false;
    }
    valMessage.textContent = '';
    return true;
  }

  setSubmitButtonState() {
    const errorMessages = {requiredField: 'Это обязательное поле', length: 'Должно быть от 2 до 30 символов', needLink: 'Здесь должна быть ссылка'};
    const button = this.form.querySelector('.popup__button');
    const inputs = [this.form.elements[0], this.form.elements[1]];
    const checkInputs = inputs.every((function(input) {
      return this.checkInputValidity(input, errorMessages);
    }).bind(this))
    if (!checkInputs) {
      button.setAttribute('disabled', true);
      button.classList.add('popup__button_disabled');
    } else {
      button.removeAttribute('disabled');
      button.classList.remove('popup__button_disabled');
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', (function() {
      this.setSubmitButtonState();
    }).bind(this));
  }
}