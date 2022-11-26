const popupInfo = document.querySelector('.popup_set-info');//ограничем поиск некоторых элементов
const popupInfoForm = document.forms["profile-form"];
const popupAddCard = document.querySelector('.popup_set-add');
const popupAddForm = document.forms["card-form"];
const profileInfo = document.querySelector('.profile__info');
const popupFoto = document.querySelector('.popup_show-foto');
const popups = document.querySelectorAll('.popup');
const elementTemplate = document.querySelector('#element-template').content;

const elementsContainer = document.querySelector('.elements');//куда будем добавлять новые картинки

const profileName = profileInfo.querySelector('.profile__name');//выберем имя и описание профиля
const profileDescription = profileInfo.querySelector('.profile__description');

const popupFotoName = popupFoto.querySelector('.popup__place-name');//выберем элементы попапа картинки
const popupFotoImg = popupFoto.querySelector('.popup__foto');

const popupInputName = popupInfo.querySelector('#text-name');//выберем куда будем вводить данные 
const popupInputDescription = popupInfo.querySelector('#text-description');
const popupInfoInputs = Array.from(popupInfo.querySelectorAll('.popup__input'));
const popupInputPlace = popupAddCard.querySelector('#text-place');
const popupInputURL = popupAddCard.querySelector('#url');

const popupOpenButtonInfoElement = profileInfo.querySelector('.profile__popup');//выберем кнопочки
const popupCloseButtonInfoElement = popupInfo.querySelector('.popup__close');
const popupOpenButtonAddElement = document.querySelector('.profile__add');
const popupCloseButtonAddElement = popupAddCard.querySelector('.popup__close');
const popupOpenButtonFotoElement = document.querySelector('.element__foto');
const popupCloseButtonFotoElement = popupFoto.querySelector('.popup__close');
const popupInfoSaveButton = popupInfo.querySelector('.popup__save');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const initialCards = [
    {
        place: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        place: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        place: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        place: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        place: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        place: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown',closePopupByEsc);
}

function openAddPopup() {
    openPopup(popupAddCard);
}

const openFotoPopup = function (text, URL) {
    openPopup(popupFoto);
    popupFotoImg.src = URL;
    popupFotoImg.alt = 'картинка локации ' + text;
    popupFotoName.textContent = text;
};

const createCard = function (text, foto) {    
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const elementFoto = element.querySelector('.element__foto');
    const elementText = element.querySelector('.element__text');
    elementText.textContent = text;
    elementFoto.src = foto;
    elementFoto.alt = 'картинка локации ' + text;
    element.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    element.querySelector('.element__btn-delete').addEventListener('click', function (evt) {
        element.remove();
    });

    elementFoto.addEventListener('click', function () {
        openFotoPopup(text, foto);
    });

    return element;
};//создаем новую карточку с кнопки удалить и лайком и попапом

function addNewElementInBeggin(element) {
    elementsContainer.prepend(element);
};

initialCards.forEach(function (elem) {
    const card = createCard(elem.place, elem.link);
    addNewElementInBeggin(card);
});//вывод уже существующих карточек

const setPopupInfo = function () {
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
}//чтобы попап знал что есть в информации

const openInfoPopup = function (evt) {
    openPopup(popupInfo);
    setPopupInfo();
    toggleButtonState(popupInfoInputs,popupInfoSaveButton,popupSelectors);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown',closePopupByEsc);
}

function closePopupByOverlayClick(evt) {
    if (evt.target !== evt.currentTarget) {
        return;
    }
    closePopup(evt.target);
}

function closePopupByEsc(evt) {
    if (evt.key !== 'Escape') {
        return;
    }
    closePopup(document.querySelector('.popup_is-opened'));
}

const handleProfileFormSubmit = function (evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopup(evt.target.closest('.popup'));
}//отправка информации о пользователе

const handleAddFormSubmit = function (evt) {
    evt.preventDefault();
    const newCard = createCard(popupInputPlace.value, popupInputURL.value);
    addNewElementInBeggin(newCard);
    closePopup(evt.target.closest('.popup'));
    evt.target.reset();
}//добавление картинки

popupOpenButtonInfoElement.addEventListener('click', openInfoPopup);
popupInfoForm.addEventListener('submit', handleProfileFormSubmit);

popupOpenButtonAddElement.addEventListener('click', openAddPopup);
popupAddForm.addEventListener('submit', handleAddFormSubmit);

popupCloseButtons.forEach(el => el.addEventListener('click', function(evt){
    closePopup(evt.target.closest('.popup'));
}));
popups.forEach(el => el.addEventListener('click', closePopupByOverlayClick));
//закрытия попапов