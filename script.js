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


/*
  По проектной работе 9 нет критических замечаний, необходимые запросы к серверу реализованы,
  есть обработка ошибок и все данные обновляются на странице только после ответа сервера

  Надо исправить: 
  - баг при сохранении данных пользователя. Мы открываем попап редактирования, вносим изменения,
  нажимаем на кнопку "Сохранить" и запрос отправляется на сервер. В случае если у нас нет интернета
  или сервер по какой то причине недоступен запрос не выполнился и попап остался открытым.
  Мы нажимаем ещё раз на кнопку "Сохранить", что бы ещё раз отправить запрос, и теперь уже
  вместо отправки данных на сервер страница перезагружается. Это поведение не допустимо и связано с тем 
  что обработчик вешается на кнопку с ключем  {once: true} и отрабатывает только один раз

  Можно лучше:
  - довольно общее название для класса Api, лучше отразить назначение сервера, например MestoApi 
  - проверка ответа сервера и преобразование из json
    дублируется во всех методах класса Api, лучше вынести в отдельный метод



  Так же наша команда приносит извинения, при проверке работы на предыдущем спринте были пропущены следующие ошибки:

  Надо исправить:
  *- в классах не должны создаваться экземпляры других классов, это вызывает сильную связанность кода
  нужно в класс CardList передавать уже созданные карточки или передавать функцию которая умеет создавать необходимые экземпляры
  *- когда код расположен в разных файлах, его нужно 
    заключать в модули, т.к. если файлов будет много, то в разных 
    файлах могут появится функции или переменные с одинаковыми именами,
    они будут переопределять друг друга. Модуль должен предоставлять
    наружу только минимально необходимый api
    Для создании модулей можно воспользоваться IIFE, подробнее:
    https://learn.javascript.ru/closures-module
    https://habr.com/ru/company/ruvds/blog/419997/ 
    Нужно обернуть в модули как минимум содержимое файла script.js
    Оборачивание содержимого файл в IIFE не позволит использовать переменные объявленные внутри IIFE
    за его пределами и нужно будет передавать их в классы явно. Например передавать в класс UserInfo
    используемые им элементы userName и userJob

  Можно лучше: 
  - не использовать глобальные переменные внутри классов
  - в классе Popup нарушен принцип открытости закрытости, лучше оставить в классе Popup
  только базовый функционал, а функционал относящийся к конкретному попапу вынести отдельно

  Данные исправления необходимо внести, т.к в дальнейшем вы можете столкнуться с проблемами при 
  выполнении заданий и сдачи проектных и дипломной работы

*/

/*
  Отлично, критические замечания исправлены. Теперь если один раз запрос не выполнился попап ведет себя корректно

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Если у Вас будет свободное время попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/