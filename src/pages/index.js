import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidation.js';
import { validationConfig,  personalInfo, userPopupSelector, userForm, popupAddSelector, addForm, fotoPopupSelector, deletePopupSelector, avatarPopupSelector, avatarForm, cardTemplateSelector, cardsContainerSelector, popupInputName, popupInputDescription, nameSelector, descriptionSelector, avatarSelector, userPopupOpenButton, addPopupOpenButton, avatarPopupOpenButton, profilePopupSubmitButton, addPopupSubmitButton, deletePopupSubmitButton, avatarPopupSubmitButton } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
    headers: personalInfo.headers,
    cohortURL: personalInfo.cohortURL
});

let deleteCardID;
const deletePopup = new PopupWithForm(deletePopupSelector, () => {
    deletePopupSubmitButton.textContent = "Удаление...";
    api.deleteCard(deleteCardID)
        .then(() => {
            document.getElementById(`${deleteCardID}`).remove();
            deletePopup.close();
            deleteCardID = null;
        })
        .catch((err) => { console.log(err) })
        .finally(() => deletePopupSubmitButton.textContent = "Да");
})
deletePopup.setEventListeners();

const imagePopup = new PopupWithImage(fotoPopupSelector);// попап всех картинок
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
                    .catch((err) => { console.log(err) })
            }
            else {
                return api.unlike(cardID)
                    .catch((err) => { console.log(err) })
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

const avatarPopup = new PopupWithForm(avatarPopupSelector, (input) => {
    avatarPopupSubmitButton.textContent = "Cохранение...";
    api.patchAvatarInfo(input.avatarLink).then((res) => {
        userInfoInstallation.setUserAvatar(input.avatarLink);
        avatarPopup.close();
        return res;
    })
        .catch((err) => { console.log(err) })
        .finally(() => {
            avatarPopupSubmitButton.textContent = "Cохранить";
        });
});
avatarPopup.setEventListeners();

const addingPopup = new PopupWithForm(popupAddSelector, (inputs) => {
    addPopupSubmitButton.textContent = 'Cоздание...';
    api.postCard(inputs.url, inputs.place)
        .then((res) => {
            cardSection.addItem(renderCard(res.link, res.name, res.likes, res._id, res.owner._id));
            addingPopup.close();
        })
        .catch((err) => { console.log(err) })
        .finally(() => {
            addPopupSubmitButton.textContent = "Cоздать"
        })
});
addingPopup.setEventListeners();// работа с попапом добавлеия картинки

function fillProfileInputs() {
    const userInfo = userInfoInstallation.getUserInfo();
    popupInputName.value = userInfo.name;
    popupInputDescription.value = userInfo.description;
}//чтобы попап знал что есть в информации

const userPopup = new PopupWithForm(userPopupSelector, (input) => {
    profilePopupSubmitButton.textContent = "Сохранение...";
    api.patchUserInfo(input.name, input.description)
        .then((res) => {
            userInfoInstallation.setUserInfo(input.name, input.description);
            userPopup.close();
            return res;
        })
        .catch((err) => { console.log(err) })
        .finally(() => {
            profilePopupSubmitButton.textContent = "Сохранить";
        })
});
userPopup.setEventListeners();// функционал попапа юзера

userPopupOpenButton.addEventListener('click', () => {
    fillProfileInputs();
    userPopup.open();
});
addPopupOpenButton.addEventListener('click', addingPopup.open.bind(addingPopup));// открытие попапов
avatarPopupOpenButton.addEventListener('click', avatarPopup.open.bind(avatarPopup));

const avatarFormValidor = new FormValidator(validationConfig, avatarForm);
avatarFormValidor.enableValidation();

const infoFormValidor = new FormValidator(validationConfig, userForm);
infoFormValidor.enableValidation();

const addFormValidor = new FormValidator(validationConfig, addForm);
addFormValidor.enableValidation();
// валидация