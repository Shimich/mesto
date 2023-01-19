import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackForm) {
        super(popupSelector);
        this._callback = callbackForm;
    }

    _getInputValues() {
        const inputValues = [];
        this._popupElement = this._getPopupElement();
        inputValues[0] = this._popupElement.querySelector('.popup__input').value;
        inputValues[1] = this._popupElement.querySelectorAll('.popup__input')[1].value;

        return inputValues;
    }

    _mainCallback(evt) {
        const values = this._getInputValues();
        this._callback(evt, values[0], values[1]);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', this._mainCallback.bind(this));
    }

    close() {
        this._popupElement = super._getPopupElement();
        this._popupElement.reset();
        this._popupElement.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
}