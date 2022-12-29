import Card from './Card.js';
import FormValidator from './FormValidation.js';
import {initialCards,popupSelectors} from './constants.js';

const popupInfo = document.querySelector('.popup_set-info');//ограничем поиск некоторых элементов
const popupInfoForm = document.forms["profile-form"];
const popupAddCard = document.querySelector('.popup_set-add');
const popupAddForm = document.forms["card-form"];
const profileInfo = document.querySelector('.profile__info');
const popupFoto = document.querySelector('.popup_show-foto');
const popups = document.querySelectorAll('.popup');
const cardTemplate = document.querySelector('#element-template').content;

const elementsContainer = document.querySelector('.elements');//куда будем добавлять новые картинки

const profileName = profileInfo.querySelector('.profile__name');//выберем имя и описание профиля
const profileDescription = profileInfo.querySelector('.profile__description');

const popupFotoName = popupFoto.querySelector('.popup__place-name');//выберем элементы попапа картинки
const popupFotoImg = popupFoto.querySelector('.popup__foto');

const popupInputName = popupInfo.querySelector('#text-name');//выберем куда будем вводить данные 
const popupInputDescription = popupInfo.querySelector('#text-description');
const popupInputPlace = popupAddCard.querySelector('#text-place');
const popupInputURL = popupAddCard.querySelector('#url');

const popupOpenButtonInfoElement = profileInfo.querySelector('.profile__popup');//выберем кнопочки
const popupOpenButtonAddElement = document.querySelector('.profile__add');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const esc = 'Escape';

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc);
}

function openAddPopup() {
    openPopup(popupAddCard);
}

function openFotoPopup(text, URL) {
    openPopup(popupFoto);
    popupFotoImg.src = URL;
    popupFotoImg.alt = 'картинка локации ' + text;
    popupFotoName.textContent = text;
};

function addCard(place,url) {
    const card = new Card(place,url,cardTemplate);
    const realCard = card.createCard();
    elementsContainer.prepend(realCard);
}

initialCards.forEach(function (elem) {
    addCard(elem.place, elem.link);
});// вывод существующих карточек 

function setPopupInfo() {
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
}//чтобы попап знал что есть в информации

setPopupInfo();

const openInfoPopup = function (evt) {
    openPopup(popupInfo);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByOverlayClick(evt) {
    if (evt.target !== evt.currentTarget) {
        return;
    }
    closePopup(evt.target);
}

function closePopupByEsc(evt) {
    if (evt.key !== esc) {
        return;
    }
    closePopup(document.querySelector('.popup_is-opened'));
}

const handleProfileFormSubmit = function (evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopup(evt.target.closest('.popup'));
}//отправка информации о пользователе

const handleAddFormSubmit = function (evt) {
    evt.preventDefault();
    addCard(popupInputPlace.value, popupInputURL.value);
    closePopup(evt.target.closest('.popup'));
    evt.target.reset();
}//добавление картинки

popupOpenButtonInfoElement.addEventListener('click', openInfoPopup);
popupInfoForm.addEventListener('submit', handleProfileFormSubmit);

popupOpenButtonAddElement.addEventListener('click', openAddPopup);
popupAddForm.addEventListener('submit', handleAddFormSubmit);

popupCloseButtons.forEach(el => el.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
}));
popups.forEach(el => el.addEventListener('click', closePopupByOverlayClick));
//закрытия попапов

const infoFormValidor = new FormValidator(popupSelectors, popupInfoForm);
infoFormValidor.enableValidation(popupInfoForm);

const addFormValidor = new FormValidator(popupSelectors, popupAddForm);
addFormValidor.enableValidation(popupAddForm);
// валидаия