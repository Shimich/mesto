export default class FormValidator {

    constructor(popupSelectors, popupType) {
        this._selectors = popupSelectors;
        this._popup = popupType;
    }

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._selectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectors.errorClass);
    };//показывать ошибку

    _hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._selectors.inputErrorClass);
        errorElement.classList.remove(this._selectors.errorClass);
        errorElement.textContent = '';
    };//скрыть ошибку

    _checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._selectors.inactiveButtonClass);
            buttonElement.setAttribute("disabled", true);
        } else {
            buttonElement.classList.remove(this._selectors.inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    };

    _setEventListeners = (formElement) => {//принимает форму попап
        const inputList = Array.from(formElement.querySelectorAll(this._selectors.inputSelector));
        const buttonElement = formElement.querySelector(this._selectors.submitButtonSelector);
       
        this._toggleButtonState(inputList, buttonElement);

        const selectors = this._selectors;
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                let validator = new FormValidator(selectors, formElement);
                validator._toggleButtonState(inputList, buttonElement);
                validator._checkInputValidity(formElement, inputElement);
            });
        });
    };

    enableValidation = (formElement) => {// форма с которой работаем

        const inputList = Array.from(formElement.querySelectorAll(this._selectors.inputSelector));// список из полей ввода
        const selectors = this._selectors;

        let validator = new FormValidator(selectors, formElement);

        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
            validator._toggleButtonState(inputList, formElement.querySelector(selectors.submitButtonSelector));// переключаем кнопу после ее нажатия
        });
        this._setEventListeners(formElement);
    };

}