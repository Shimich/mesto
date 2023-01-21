export default class Card {
    constructor(link, place, templateSelctor, handleCardClick) {
        this._foto = link;
        this._text = place;
        this._templateSelector = templateSelctor;
        this._openByFoto = handleCardClick;
        this._cardElement = document.querySelector(this._templateSelector).content
            .querySelector('.element')
            .cloneNode(true);
        this._elementFoto = this._cardElement.querySelector('.element__foto');
    }

    _delClickHandler = () => {
        this._cardElement.remove();
    }

    _openFotoPopup = () => {
        this._openByFoto(this._foto, this._text);
    }

    _switchLike = (evt) => {
        evt.target.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this._cardElement.querySelector('.element__like').addEventListener('click', this._switchLike);
        this._cardElement.querySelector('.element__btn-delete').addEventListener('click', this._delClickHandler);
        this._elementFoto.addEventListener('click', this._openFotoPopup);
    }

    createCard() {
        this._cardElement.querySelector('.element__text').textContent = this._text;
        this._elementFoto.src = this._foto;
        this._elementFoto.alt = 'картинка локации ' + this._text;

        this._setEventListeners();

        return this._cardElement;
    };

}