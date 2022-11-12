const popupInfo = document.querySelector('.popup_set-info');//ограничем поиск некоторых элементов
const popupInfoForm = document.forms["profile-form"];
const popupAdd = document.querySelector('.popup_set-add');
const popupAddForm = document.forms["card-form"];
const profileInfo = document.querySelector('.profile__info');
const popupFoto = document.querySelector('.popup_show-foto');

const elementsContainer = document.querySelector('.elements');//куда будем добавлять новые картинки

const profileName = profileInfo.querySelector('.profile__name');//выберем имя и описание профиля
const profileDescription = profileInfo.querySelector('.profile__description');

const popupFotoName = popupFoto.querySelector('.popup__place-name');//выберем элементы попапа картинки
const popupFotoImg = popupFoto.querySelector('.popup__foto');

const popupInputName = popupInfo.querySelector('#input_text-name');//выберем куда будем вводить данные 
const popupInputDescription = popupInfo.querySelector('#input_text-description');
const popupInputPlace = popupAdd.querySelector('#input_text-place');
const popupInputURL = popupAdd.querySelector('#input_url');

const popupOpenButtonInfoElement = profileInfo.querySelector('.profile__popup');//выберем кнопочки
const popupCloseButtonInfoElement = popupInfo.querySelector('.popup__close');
const popupOpenButtonAddElement = document.querySelector('.profile__add');
const popupCloseButtonAddElement = popupAdd.querySelector('.popup__close');
const popupOpenButtonFotoElement = document.querySelector('.element__foto');
const popupCloseButtonFotoElement = popupFoto.querySelector('.popup__close');

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

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
}

function openAddPopup() {
    openPopup(popupAdd);
}

const openInfoPopup = function (evt) {
    openPopup(popupInfo);
    setPopupInfo();
}

const openFotoPopup = function (text, URL) {
    openPopup(popupFoto);
    popupFotoImg.src = URL;
    popupFotoImg.alt = 'картинка локации ' + text;
    popupFotoName.textContent = text;
};

const createCard = function (text, foto) {
    const elementTemplate = document.querySelector('#element-template').content;
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
    const oneOfSixCard = createCard(elem.place, elem.link);
    addNewElementInBeggin(oneOfSixCard);
});//вывод уже существующих карточек

const setPopupInfo = function () {
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
}//чтобы попап знал что есть в информации

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

function closeSomePopup(evt) {
    closePopup(evt.target.closest('.popup'));
}

const handleProfileFormSubmit = function (evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closeSomePopup(evt);
}//отправка информации о пользователе

const handleAddFormSubmit = function (evt) {
    evt.preventDefault();
    const newCard = createCard(popupInputPlace.value, popupInputURL.value);
    addNewElementInBeggin(newCard);
    closeSomePopup(evt);
    evt.target.reset();
}//добавление картинки

popupOpenButtonInfoElement.addEventListener('click', openInfoPopup);
popupInfoForm.addEventListener('submit', handleProfileFormSubmit);

popupOpenButtonAddElement.addEventListener('click', openAddPopup);
popupAddForm.addEventListener('submit', handleAddFormSubmit);


popupCloseButtons.forEach(el => el.addEventListener('click', closeSomePopup));