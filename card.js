class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }

  create() {
    const placeCard = document.createElement('div');
    const cardImage = document.createElement('div');
    const cardDescription = document.createElement('div');
    const deleteIcon = document.createElement('button');
    const cardName = document.createElement('h3');
    const likeIcon = document.createElement('button');

    placeCard.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    cardImage.style = `background-image: url(${this.link})`;
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    cardName.textContent = this.name;
    deleteIcon.classList.add('place-card__delete-icon');
    likeIcon.classList.add('place-card__like-icon');

    placeCard.appendChild(cardImage);
    placeCard.appendChild(cardDescription);
    cardImage.appendChild(deleteIcon);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(likeIcon);

    this.cardElement = placeCard;

    return placeCard;
  }

  setEventListeners() {
    this
      .cardElement
      .querySelector('.place-card__like-icon')
      .addEventListener('click', this.like);    
    this
      .cardElement
      .querySelector('.place-card__delete-icon')
      .addEventListener('click', this.remove.bind(this));
    this
      .cardElement
      .querySelector('.place-card__image')
      .addEventListener('click', this.showBig.bind(this));    
  }

  showBig() {
    if (event.target.classList.contains('place-card__image')) {
      imagePopup.popup.querySelector('.popup__image').src = this.link;
      imagePopup.open();
    }
  }

  like() {
    this.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    this.cardElement.parentNode.removeChild(this.cardElement);
  }
}