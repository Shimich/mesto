const popupInfo = document.querySelector('.popup_set-info');//ограничем поиск некоторых элементов
const popupInfoForm = popupInfo.querySelector('.popup__form');
const popupAdd = document.querySelector('.popup_set-add');
const popupAddForm = popupAdd.querySelector('.popup__form');
const profileInfo = document.querySelector('.profile__info');
const popupFoto = document.querySelector('.popup_show-foto');

const elementsContainer = document.querySelector('.elements');

const popupFotoImg = popupFoto.querySelector('.popup__foto');
// const elementFoto = elementTemplate.querySelector('.element__foto');
// const elementText = elementTemplate.querySelector('.element__text');

const profileName = profileInfo.querySelector('.profile__name');//выберем имя и описание профиля
const profileDescription = profileInfo.querySelector('.profile__description');

const popupFotoName = popupFoto.querySelector('.popup__place-name');

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

const openPopupFoto = function (text,URL) {
    popupFoto.classList.add('popup_is-opened');
    popupFotoImg.src = URL;
    console.log('htr');
    popupFotoName.textContent=text;
};

function addNewElement(text, foto) {
    const elementTemplate = document.querySelector('#element-template').content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__text').textContent = text;
    element.querySelector('.element__foto').src = foto;

    element.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    element.querySelector('.element__btn-delete').addEventListener('click', function (evt) {
        element.remove();
    });

    element.querySelector('.element__foto').addEventListener('click',function(){
        openPopupFoto(text,foto);
    });

    elementsContainer.prepend(element);
};

initialCards.forEach(function (elem) {
    addNewElement(elem.place, elem.link);

});//вывод уже существующих карточек



// likeElelment.forEach(function (i) {
//     i.addEventListener('click', function () {
//         if (i.classList.contains('element__like_active')) {
//             i.classList.remove('element__like_active');
//             i.classList.add('element__like_off');
//             return;
//         }
//         i.classList.add('element__like_active');
//         i.classList.remove('element__like_off');
//     })
// });//ставим лайки

const setPopupInfo = function () {
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
}//чтобы попап знал что есть в информации

const openPopupInfo = function (event) {
    popupInfo.classList.add('popup_is-opened');
    setPopupInfo();
}

const openPopupAdd = function (event) {
    popupAdd.classList.add('popup_is-opened');
}

const closePopupInfo = function () {
    popupInfo.classList.remove('popup_is-opened');
}

const closePopupAdd = function () {
    popupAdd.classList.remove('popup_is-opened');
}

const closePopupFoto = function () {
    popupFoto.classList.remove('popup_is-opened');
}

const submitFormHandlerInfo = function (evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopupInfo();
}//отправка информации о пользователе

const submitFormHandlerAdd = function (evt) {
    evt.preventDefault();
    addNewElement(popupInputPlace.value, popupInputURL.value)
    closePopupAdd();
}//добавление картинки

popupOpenButtonInfoElement.addEventListener('click', openPopupInfo);
popupCloseButtonInfoElement.addEventListener('click', closePopupInfo);
popupInfoForm.addEventListener('submit', submitFormHandlerInfo);

popupOpenButtonAddElement.addEventListener('click', openPopupAdd);
popupCloseButtonAddElement.addEventListener('click', closePopupAdd);
popupAddForm.addEventListener('submit', submitFormHandlerAdd);

popupCloseButtonFotoElement.addEventListener('click', closePopupFoto);