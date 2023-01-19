import { esc } from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    _getPopupElement() {
        const element = document.querySelector(this._popupSelector);

        return element;
    }

    close = () => {
        this._popupElement = this._getPopupElement();
        this._popupElement.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key !== esc) {
            return;
        }
        this.close();
    }

    open = () => {
        this._popupElement = this._getPopupElement();
        this._popupElement.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleOverlayClose(evt) {
        if (evt.target !== evt.currentTarget) {
            return;
        }
        this.close();
    }

    setEventListeners() {
        this._popupElement = this._getPopupElement();
        this._popupElement.querySelector('.popup__close').addEventListener('click', this.close);
        this._popupElement.addEventListener('click', this._handleOverlayClose.bind(this));
    }
}




