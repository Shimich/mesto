import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupFotoImg = this._popupElement.querySelector('.popup__foto');
        this._popupFotoName = this._popupElement.querySelector('.popup__place-name');
    }

    open(url, text) {
        this._popupFotoImg.src = url;
        this._popupFotoImg.alt = 'картинка локации ' + text;
        this._popupFotoName.textContent = text;
        super.open();
    }
}