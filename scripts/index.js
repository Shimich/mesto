
const popupElement = document.querySelector('.popup');//ограничем поиск некоторых элементов
const profileInfo = document.querySelector('.profile__info');
const popupForm=popupElement.querySelector('.popup__form');

const profileName = profileInfo.querySelector('.profile__name');//выберем имя и описание профиля
const profileDescription = profileInfo.querySelector('.profile__description');


const popupInputName = popupElement.querySelector('#input_text-name');//выберем куда будем вводить данные 
const popupInputDescription = popupElement.querySelector('#input_text-description');

const popupOpenButtonElement = profileInfo.querySelector('.profile__popup');//выберем кнопочки
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
// const likeElelment = document.querySelectorAll('.element__like');

// likeElelment.forEach(function (i) {
//     i.addEventListener('click', function () {
//         if (i.classList.contains('element__like_active')) {
//             i.classList.remove('element__like_active');
//             i.classList.add('element__like_off');
//             return;
//         }
//         i.classList.add('element__like_active');
//         i.classList.remove('element__like_off');
//     })
// });//ставим лайки

const setPopupInfo = function () {
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
}//чтобы попап знал что есть в информации

const openPopup = function (event) {
    console.log(event.target, event.currentTarget);
    popupElement.classList.add('popup_is-opened');
    setPopupInfo();
}

const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
}

const submitFormHandler = function (evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopup();
}//отправка информации о пользователе

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupForm.addEventListener('submit', submitFormHandler);
