class Card {
    static _template = document.querySelector('#element-template').content;

    constructor(text, foto) {
        this._foto = foto;
        this._text = text;
    }

    _delClickHandler = () => {
        this._cardElement.remove();
    }

    _openFotoPopup = () => {
        openFotoPopup(this._text, this._foto);
    }

    _switchLike=(evt)=>{
        evt.target.classList.toggle('element__like_active');
    }

    createCard(container) {
        this._cardElement = Card._template.cloneNode(true).children[0];
        this._cardElement.querySelector('.element__text').textContent = this._text;
        this._elementFoto = this._cardElement.querySelector('.element__foto');
        this._elementFoto.src = this._foto;
        this._elementFoto.alt = 'картинка локации ' + this._text;
        
        this._cardElement.querySelector('.element__like').addEventListener('click',this._switchLike);

        this._cardElement.querySelector('.element__btn-delete').addEventListener('click', this._delClickHandler);

        this._elementFoto.addEventListener('click', this._openFotoPopup);

        container.prepend(this._cardElement);
    };

}