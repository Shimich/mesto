import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidation.js';
import { initialCards, validationConfig } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const popupInfo = document.querySelector('.popup_set-info');//ограничим поиск некоторых элементов
const popupInfoSelector = '.popup_set-info';
const popupInfoForm = document.forms["profile-form"];
const popupAddSelector = '.popup_set-add';
const popupAddForm = document.forms["card-form"];
const profileInfo = document.querySelector('.profile__info');
const popupFotoSelector = '.popup_show-foto';
const cardTemplateSelector = '#element-template';

const cardsContainerSelector = '.elements'//куда будем добавлять новые картинки

const popupInputName = popupInfo.querySelector('#text-name');//выберем откуда будем вводить данные 
const popupInputDescription = popupInfo.querySelector('#text-description');
const nameSelector = '.profile__name';//выберем куда будем вводить данные
const descriptionSelector = '.profile__description';

const popupOpenButtonInfoElement = profileInfo.querySelector('.profile__popup');//выберем кнопочки
const popupOpenButtonAddElement = document.querySelector('.profile__add');

const imagePopup = new PopupWithImage(popupFotoSelector);// попап всех картинок
imagePopup.setEventListeners();

function renderCard(link, place) {
    const card = new Card(link, place, cardTemplateSelector, imagePopup.open.bind(imagePopup));
    const realCard = card.createCard();
    cardList.addItem(realCard);
}

const cardList = new Section({// картинки в секцию
    items: initialCards,
    renderer: (item) => {
        renderCard(item.link, item.place);// здесь link потому что в итичиалкардс так получаем
    }
}, cardsContainerSelector);

cardList.renderItems();//отрисовка тех что есть

const addingPopup = new PopupWithForm(popupAddSelector, (input) => {
    renderCard(input.url, input.place);// здесть урл потому что берем из инпутов
    addingPopup.close();
});
addingPopup.setEventListeners();// работа с попапом добавлеия картинки

const userInfoInstallation = new UserInfo(nameSelector, descriptionSelector);

function setPopupInfo() {
    const userInfo = userInfoInstallation.getUserInfo();
    popupInputName.value = userInfo.name;
    popupInputDescription.value = userInfo.description;
}//чтобы попап знал что есть в информации
setPopupInfo();

const userPopup = new PopupWithForm(popupInfoSelector, (input) => {
    userInfoInstallation.setUserInfo(input.name, input.description);
    userPopup.close();
});
userPopup.setEventListeners();// функционал попапа юзера

popupOpenButtonInfoElement.addEventListener('click', () => {
    setPopupInfo();
    infoFormValidor.enableValidation();// (для себя) кажется так скоздается куча новых слушателей чем засоряю память, а тогл приватный метод
    userPopup.open();    
});
popupOpenButtonAddElement.addEventListener('click', addingPopup.open.bind(addingPopup));// открытие попапов

const infoFormValidor = new FormValidator(validationConfig, popupInfoForm);
infoFormValidor.enableValidation();

const addFormValidor = new FormValidator(validationConfig, popupAddForm);
addFormValidor.enableValidation();
// валидация