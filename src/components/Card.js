export default class Card {
    constructor({ handleCardClick, handleDeleteClick, likeStatus } , link, place, likes, id, owner, userID, templateSelctor) {
        this._foto = link;
        this._text = place;
        this._likes = likes
        this.cardID = id;
        this._owner = owner;
        this._userID = userID;
        this._templateSelector = templateSelctor;
        this._openByFoto = handleCardClick;
        this._delete = handleDeleteClick;
        this._likeStatus = likeStatus;
        this._cardElement = document.querySelector(this._templateSelector).content
            .querySelector('.element')
            .cloneNode(true);
        this._elementFoto = this._cardElement.querySelector('.element__foto');
        this._likeSum = this._cardElement.querySelector('.element__like-sum');
        this._likeSum.textContent = this._likes.length;
        this._likeButton = this._cardElement.querySelector('.element__like-btn');
        this._deleteButton = this._cardElement.querySelector('.element__btn-delete');
    }

    _openFotoPopup = () => {
        this._openByFoto(this._foto, this._text);
    }

    isLiked() {
        return (this._likes.some(like => {
            return like._id === this._userID;
        }))
    }// есть ли мой лайк

    isLikedNow() {
        return this._likeButton.classList.contains('element__like_active');
    }// лайкнута ли на странице

    _handleLike = () => {
        this._likeStatus()
            .then((res) => {
                this._likeSum.textContent = `${res.likes.length}`;
                this._likeButton.classList.toggle('element__like_active');
            })
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLike);
        this._deleteButton.addEventListener('click', this._delete);
        this._elementFoto.addEventListener('click', this._openFotoPopup);
    }

    _isOwner() {
        return (this._owner === this._userID);
    }

    createCard() {
        this._cardElement.querySelector('.element__text').textContent = this._text;
        this._elementFoto.src = this._foto;
        this._elementFoto.alt = 'картинка локации ' + this._text;
        this._cardElement.setAttribute("id", `${this.cardID}`);
        if (!this._isOwner()) {
            this._deleteButton.classList.add('element__btn-delete_hide');
        }
        if (this.isLiked()) {
            this._likeButton.classList.add('element__like_active');
        }
        this._setEventListeners();
        return this._cardElement;
    };

}