import openFotoPopup from './index.js';
export default class Card {
    constructor(text, foto, templateSelctor) {
        this._foto = foto;
        this._text = text;
        this._templateSelector = templateSelctor;
    }

    _getTemplate() {
        const element = document.querySelector(this._templateSelector).content
            .querySelector('.element')
            .cloneNode(true);

        return element;
    }

    _delClickHandler = () => {
        this._cardElement.remove();
    }

    _openFotoPopup = () => {
        openFotoPopup(this._text, this._foto);
    }

    _switchLike = (evt) => {
        evt.target.classList.toggle('element__like_active');
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._cardElement.querySelector('.element__text').textContent = this._text;
        this._elementFoto = this._cardElement.querySelector('.element__foto');
        this._elementFoto.src = this._foto;
        this._elementFoto.alt = 'картинка локации ' + this._text;

        this._cardElement.querySelector('.element__like').addEventListener('click', this._switchLike);

        this._cardElement.querySelector('.element__btn-delete').addEventListener('click', this._delClickHandler);

        this._elementFoto.addEventListener('click', this._openFotoPopup);

        return this._cardElement;
    };

}