export class Popup {
  constructor(popup, action, userInfo) {
    this.popup = popup;
    this.form = this.popup.querySelector('.popup__form');
    this.action = action;
    this.popupClose = this.popup.querySelector('.popup__close');
    this.userInfo = userInfo;
    this.closeHandler = this.action;
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    if (this.popup.classList.contains('popup_edit')) {
      this.form.elements[0].value = this.userInfo.name;
      this.form.elements[1].value = this.userInfo.about;
    };

    this.closeHandler = this.action.bind(this);

    this
      .popupClose
      .addEventListener('click', this.close.bind(this), {once: true});
    if (!this.popup.classList.contains('popup_image')) {
      this.form.addEventListener('submit', this.closeHandler);
    }

  }

  close() {
    this.popup.classList.remove('popup_is-opened');
    this.form.removeEventListener('submit', this.closeHandler);
  }
}