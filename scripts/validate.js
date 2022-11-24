const popupOpenButtonInfoElementForValid = document.querySelector('.profile__popup');
const popupInfoFormForValidity = document.forms["profile-form"];

const hasInvalidInput = (inputList) => {
    let s = inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
    return s;
};//проверка есть ли невалидные инпуты

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};//показывать ошибку

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};//скрыть ошибку

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};//проверка валидности

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__save_inactive');
    } else {
        buttonElement.classList.remove('popup__save_inactive');
    }
};//переключатель кнопки сохранить

const setEventListeners = (formElement) => {//принимает форму попап
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const setEventListenerOnProfile = () => {
    const inputList = Array.from(popupInfoFormForValidity.querySelectorAll('.popup__input'));
    const buttonElement = popupInfoFormForValidity.querySelector('.popup__save');

    inputList.forEach((inputElement) => {
        popupOpenButtonInfoElementForValid.addEventListener('click', function () {
            checkInputValidity(popupInfoFormForValidity, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};//чтобы приоткрытии попапа профиля не ломался попап для новой карточки

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));//собираем все формы
    formList.forEach((formElement) => {// для каждого попапа
        const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
            toggleButtonState(inputList, formElement.querySelector('.popup__save'));
        });
        setEventListeners(formElement);
    });
    setEventListenerOnProfile();
};

enableValidation();