import "./pages/index.css";

(function() {
  const addButton = document.querySelector('.user-info__button');
  const editButton = document.querySelector('.user-info__edit-button');
  const closePopupBtn = document.querySelector('.popup__close');
  const addForm = document.forms.new;
  const editForm = document.forms.edit;
  const userName = document.querySelector('.user-info__name');
  const userJob = document.querySelector('.user-info__job');
  const userInfo = new UserInfo(document.querySelector('.user-info__name').textContent, document.querySelector('.user-info__job').textContent, userName, userJob, editForm);

  const addCardPopup = new Popup(document.querySelector('.popup_add'), function() {
    event.preventDefault();
    const newCard = new Card(addForm.elements.name.value, addForm.elements.link.value);
    cardList.addCard(newCard);
    addForm.reset();
    addCardPopup.close();
  });

  const editProfilePopup = new Popup(document.querySelector('.popup_edit'), function(event) {
    event.preventDefault();
    api.patchUserInfo(editForm.elements.name.value, editForm.elements.about.value)
      .then (data => {
        userInfo.setUserInfo(data.name, data.about);
        userInfo.updateUserInfo();
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      });  
  }, userInfo)

  const imagePopup = new Popup(document.querySelector('.popup_image'));

  const editFormVal = new FormValidator(editForm);
  editFormVal.setEventListeners();

  const addFormVal = new FormValidator(addForm);
  addFormVal.setEventListeners();

  const api = new Api('cohort10', 'd6d07657-35d8-4107-87df-9ee3ec71ce74');

  api.getUserInfo()
    .then((data) => {
      userInfo.name = data.name;
      userInfo.about = data.about;
      userInfo.updateUserInfo();
    })
    .catch((err) => {
      console.log(err);
    });

  const cardList = new CardList(document.querySelector('.places-list'), []); 

  api.getCards()
    .then((data) => {   
      cardList.cards = createInitialCardsArray(data);
      cardList.render();
    })
    .catch((err) => {
      console.log(err);
    });

  function createInitialCardsArray(array) {
    return array.map(function(item) {
      const card = new Card(item.name, item.link);
      return card;
    });
  }

  addButton.addEventListener('click', addCardPopup.open.bind(addCardPopup));
  editButton.addEventListener('click', editProfilePopup.open.bind(editProfilePopup));
})();