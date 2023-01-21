import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callbackForm) {
        super(popupSelector);
        this._callback = callbackForm;
        this._inputs = this._popupElement.querySelectorAll('.popup__input');
        this._form = this._popupElement.querySelector('.popup__form');
    }

    _getInputValues() {
        const inputValues = [];
        this._inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    _mainCallback(evt) {
        evt.preventDefault();
        const values = this._getInputValues();
        this._callback(values);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._mainCallback.bind(this));
    }

    close() {
        this._form.reset();
        super.close();
    }
}