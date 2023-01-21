export default class FormValidator {
    constructor(popupSelectors, formOfPopup) {
        this._selectors = popupSelectors;
        this._form = formOfPopup;
        this._inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
        this._buttonAdd = this._form.querySelector(this._selectors.submitButtonSelector);
    }

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._selectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._selectors.errorClass);
    };//показывать ошибку

    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._selectors.inputErrorClass);
        errorElement.classList.remove(this._selectors.errorClass);
        errorElement.textContent = '';
    };//скрыть ошибку

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonAdd.classList.add(this._selectors.inactiveButtonClass);
            this._buttonAdd.setAttribute("disabled", true);
        } else {
            this._buttonAdd.classList.remove(this._selectors.inactiveButtonClass);
            this._buttonAdd.removeAttribute("disabled");
        }
    };

    _setEventListeners() {
        const validator = new FormValidator(this._selectors, this._form);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                validator._toggleButtonState();
                validator._checkInputValidity(inputElement);
            });
        });
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            setTimeout(() => { validator._toggleButtonState() }, 0);// переключаем кнопу после ее нажатия но пойзже ресета
        });
        const inputList = this._inputList;
        this._form.addEventListener('reset', function (evt) {
            setTimeout(() => {
                //validator._toggleButtonState();
                inputList.forEach((inputElement) => {
                    validator._hideInputError(inputElement);
                });
            });
        }, 0);// закрывая попам мы сбрасываем формы и врядли пользователю нужно опять напоминать ошибку
    };


    enableValidation() {
        this._toggleButtonState();
        this._setEventListeners();
    };
}