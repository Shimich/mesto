import './pages/index.css';

import Card from './components/Card.js';
import FormValidator from './components/FormValidation.js';
import { initialCards, popupSelectors } from './utils/constants.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';

const popupInfo = document.querySelector('.popup_set-info');//ограничем поиск некоторых элементов
const popupInfoSelector = '.popup_set-info';
const popupInfoForm = document.forms["profile-form"];
const popupAddSelector = '.popup_set-add';
const popupAddForm = document.forms["card-form"];
const profileInfo = document.querySelector('.profile__info');
const popupFotoSelector = '.popup_show-foto';
const cardTemplateSelector = '#element-template';

const elementsContainer = document.querySelector('.elements');//куда будем добавлять новые картинки

const popupInputName = popupInfo.querySelector('#text-name');//выберем откуда будем вводить данные 
const popupInputDescription = popupInfo.querySelector('#text-description');
const nameSelector = '.profile__name';//выберем куда будем вводить данные
const descriptionSelector = '.profile__description';

const popupOpenButtonInfoElement = profileInfo.querySelector('.profile__popup');//выберем кнопочки
const popupOpenButtonAddElement = document.querySelector('.profile__add');

const imagePopup = new PopupWithImage(popupFotoSelector);// попап всех картинок
imagePopup.setEventListeners();

const cardList = new Section({// картинки в секцию
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.link, item.place, cardTemplateSelector, imagePopup.open);
        const realCard = card.createCard();
        elementsContainer.prepend(realCard);
    }
}, elementsContainer);

cardList.renderItems();//отрисовка тех что есть

const addingPopup = new PopupWithForm(popupAddSelector, (evt, place, link) => {
    evt.preventDefault();
    const card = new Card(link, place, cardTemplateSelector, imagePopup.open);
    const realCard = card.createCard();
    cardList.addItem(realCard);
    addingPopup.close();
    evt.target.reset();
});
addingPopup.setEventListeners();// работа с попапом добавлеия картинки

const userInfoInstallation = new UserInfo(nameSelector, descriptionSelector);
const userInfo = userInfoInstallation.getUserInfo();
function setPopupInfo() {
    popupInputName.value = userInfo.name;
    popupInputDescription.value = userInfo.description;
}//чтобы попап знал что есть в информации

setPopupInfo();

const userPopup = new PopupWithForm(popupInfoSelector, (evt, name, description) => {
    evt.preventDefault();
    userInfoInstallation.setUserInfo(name, description);
    userPopup.close();
});
userPopup.setEventListeners();// функционал попапа юзера

popupOpenButtonInfoElement.addEventListener('click', userPopup.open);// открытие попапов
popupOpenButtonAddElement.addEventListener('click', addingPopup.open);

const infoFormValidor = new FormValidator(popupSelectors, popupInfoForm);
infoFormValidor.enableValidation(popupInfoForm);

const addFormValidor = new FormValidator(popupSelectors, popupAddForm);
addFormValidor.enableValidation(popupAddForm);
// валидация