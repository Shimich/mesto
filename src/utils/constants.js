// const initialCards = [
//     {
//         place: 'Архыз',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//         place: 'Челябинская область',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//         place: 'Иваново',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//         place: 'Камчатка',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//         place: 'Холмогорский район',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//         place: 'Байкал',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
// ];

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

export { validationConfig, esc, personalInfo };