import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidation.js';
import { validationConfig, personalInfo } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const popupInfo = document.querySelector('.popup_set-info');//ограничим поиск некоторых элементов
const popupInfoSelector = '.popup_set-info';
const popupInfoForm = document.forms["profile-form"];
const popupAddSelector = '.popup_set-add';
const popupAddForm = document.forms["card-form"];
const profileInfo = document.querySelector('.profile__info');
const popupFotoSelector = '.popup_show-foto';
const popupDeleteSelector = '.popup_delete-card';
const popupDeleteForm = document.forms["delete-form"];
const popupAvatarSelector = '.popup_set-avatar';
const popupAvatarForm = document.forms["avatar-form"];
const cardTemplateSelector = '#element-template';

const cardsContainerSelector = '.elements'//куда будем добавлять новые картинки

const popupInputName = popupInfo.querySelector('#text-name');//выберем откуда будем вводить данные 
const popupInputDescription = popupInfo.querySelector('#text-description');
const nameSelector = '.profile__name';//выберем куда будем вводить данные
const descriptionSelector = '.profile__description';
const avatarSelector = '.profile__avatar';

const popupOpenButtonInfoElement = profileInfo.querySelector('.profile__popup');//выберем кнопочки
const popupOpenButtonAddElement = document.querySelector('.profile__add');
const popupOpenButtonAvatar = document.querySelector('.profile__avatar-container');
const popupSubmitButtonProfile = popupInfoForm.querySelector(".popup__save");
const popupSubmitButtonAdd = popupAddForm.querySelector(".popup__save");
const popupSubmitButtonDelete = popupDeleteForm.querySelector(".popup__save");
const popupSubmitButtonAvatar = popupAvatarForm.querySelector(".popup__save");

const api = new Api({
    headers: personalInfo.headers,
    cohortURL: personalInfo.cohortURL
});

let deleteCardID;
const deletePopup = new PopupWithForm(popupDeleteSelector, () => {
    popupSubmitButtonDelete.textContent = "Удаление...";
    api.deleteCard(deleteCardID)
        .then(() => {
            document.getElementById(`${deleteCardID}`).remove();
            deletePopup.close();
            deleteCardID = null;
        })
        .catch((err) => { console.log(err) })
        .finally(() => popupSubmitButtonDelete.textContent = "Да");
})
deletePopup.setEventListeners();

const imagePopup = new PopupWithImage(popupFotoSelector);// попап всех картинок
imagePopup.setEventListeners();

const userInfoInstallation = new UserInfo(nameSelector, descriptionSelector, avatarSelector);

let userID;
function renderCard(link, place, likes, cardID, owner) {
    const card = new Card({
        handleCardClick: imagePopup.open.bind(imagePopup),
        handleDeleteClick: () => {
            deleteCardID = card.cardID;
            deletePopup.open();
        },
        likeStatus: () => {
            if (!card.isLikedNow()) {// если не было лайка
                return api.like(cardID)
            }
            else {
                return api.unlike(cardID)
            }
        }
    }, link, place, likes, cardID, owner, userID, cardTemplateSelector);
    return card.createCard();
}

let cardSection;
Promise.all([api.getUserInfo(), api.getInitialCards()])// получаем начальную информацию
    .then(([userData, cards]) => {
        userInfoInstallation.setUserInfo(userData.name, userData.about);
        userInfoInstallation.setUserAvatar(userData.avatar);
        userID = userData._id;
        cardSection = new Section({// картинки в секцию
            items: cards,
            renderer: (item) => {
                cardSection.addItem(renderCard(item.link, item.name, item.likes, item._id, item.owner._id));
            }
        }, cardsContainerSelector);
        cardSection.renderItems();// отрисовка тех что есть
    })
    .catch((err) => { console.log(err) });



const avatarPopup = new PopupWithForm(popupAvatarSelector, (input) => {
    popupSubmitButtonAvatar.textContent = "Cохранение...";
    api.patchAvatarInfo(input.avatarLink).then((res) => {
        userInfoInstallation.setUserAvatar(input.avatarLink);
        avatarPopup.close();
        return res;
    })
        .catch((err) => { console.log(err) })
        .finally(() => {
            popupSubmitButtonAvatar.textContent = "Cохранить";
        });
});
avatarPopup.setEventListeners();

const addingPopup = new PopupWithForm(popupAddSelector, (inputs) => {
    popupSubmitButtonAdd.textContent = 'Cоздание...';
    api.postCard(inputs.url, inputs.place)
        .then((res) => {
            cardSection.addItem(renderCard(res.link, res.name, res.likes, res._id, res.owner._id));
            addingPopup.close();
        })
        .catch((err) => { console.log(err) })
        .finally(() => {
            popupSubmitButtonAdd.textContent = "Cоздать"
        })
});
addingPopup.setEventListeners();// работа с попапом добавлеия картинки

function setPopupInfo() {
    const userInfo = userInfoInstallation.getUserInfo();
    popupInputName.value = userInfo.name;
    popupInputDescription.value = userInfo.description;
}//чтобы попап знал что есть в информации

const userPopup = new PopupWithForm(popupInfoSelector, (input) => {
    popupSubmitButtonProfile.textContent = "Сохранение...";
    api.patchUserInfo(input.name, input.description)
        .then((res) => {
            userInfoInstallation.setUserInfo(input.name, input.description);
            userPopup.close();
            return res;
        })
        .catch((err) => { console.log(err) })
        .finally(() => {
            popupSubmitButtonProfile.textContent = "Сохранить";
        })
});
userPopup.setEventListeners();// функционал попапа юзера

popupOpenButtonInfoElement.addEventListener('click', () => {
    setPopupInfo();
    infoFormValidor.toggleButtonState();
    userPopup.open();
});
popupOpenButtonAddElement.addEventListener('click', addingPopup.open.bind(addingPopup));// открытие попапов
popupOpenButtonAvatar.addEventListener('click', avatarPopup.open.bind(avatarPopup));

const avatarFormValidor = new FormValidator(validationConfig, popupAvatarForm);
avatarFormValidor.enableValidation();

const infoFormValidor = new FormValidator(validationConfig, popupInfoForm);
infoFormValidor.enableValidation();

const addFormValidor = new FormValidator(validationConfig, popupAddForm);
addFormValidor.enableValidation();
// валидация