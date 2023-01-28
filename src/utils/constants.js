const popupInfo = document.querySelector('.popup_set-info');//ограничим поиск некоторых элементов
const userPopupSelector = '.popup_set-info';
const userForm = document.forms["profile-form"];
const popupAddSelector = '.popup_set-add';
const addForm = document.forms["card-form"];
const profileInfo = document.querySelector('.profile__info');
const fotoPopupSelector = '.popup_show-foto';
const deletePopupSelector = '.popup_delete-card';
const deleteForm = document.forms["delete-form"];
const avatarPopupSelector = '.popup_set-avatar';
const avatarForm = document.forms["avatar-form"];
const cardTemplateSelector = '#element-template';

const cardsContainerSelector = '.elements'//куда будем добавлять новые картинки

const popupInputName = popupInfo.querySelector('#text-name');//выберем откуда будем вводить данные 
const popupInputDescription = popupInfo.querySelector('#text-description');
const nameSelector = '.profile__name';//выберем куда будем вводить данные
const descriptionSelector = '.profile__description';
const avatarSelector = '.profile__avatar';

const userPopupOpenButton = profileInfo.querySelector('.profile__popup');//выберем кнопочки
const addPopupOpenButton = document.querySelector('.profile__add');
const avatarPopupOpenButton = document.querySelector('.profile__avatar-container');
const profilePopupSubmitButton = userForm.querySelector(".popup__save");
const addPopupSubmitButton = addForm.querySelector(".popup__save");
const deletePopupSubmitButton = deleteForm.querySelector(".popup__save");
const avatarPopupSubmitButton = avatarForm.querySelector(".popup__save");

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const esc = 'Escape';

const personalInfo = {
    headers: {
        authorization: '4111871b-e7b0-4048-b367-b86bef02107d',
        'Content-Type': 'application/json'
    },
    cohortURL: 'https://mesto.nomoreparties.co/v1/cohort-57'

}

export { validationConfig, esc, personalInfo, popupInfo, userPopupSelector, userForm, popupAddSelector, addForm, profileInfo, fotoPopupSelector, deletePopupSelector, deleteForm, avatarPopupSelector, avatarForm, cardTemplateSelector, cardsContainerSelector, popupInputName, popupInputDescription, nameSelector, descriptionSelector, avatarSelector, userPopupOpenButton, addPopupOpenButton, avatarPopupOpenButton, profilePopupSubmitButton, addPopupSubmitButton, deletePopupSubmitButton, avatarPopupSubmitButton };