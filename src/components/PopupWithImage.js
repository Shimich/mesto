import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupElement = super._getPopupElement();
        this._popupFotoImg = this._popupElement.querySelector('.popup__foto');
        this._popupFotoName = this._popupElement.querySelector('.popup__place-name');
    }

    open=(url, text)=> {
        this._popupFotoImg.src = url;
        this._popupFotoImg.alt = 'картинка локации ' + text;
        this._popupFotoName.textContent = text;
        this._popupElement.classList.add('popup_is-opened');
        document.addEventListener('keydown', super._handleEscClose.bind(this));

    }
}