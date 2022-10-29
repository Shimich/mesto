
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const profileInfo = document.querySelector('.profile__info');
let profileName = profileInfo.querySelector('.profile__name');
let profileNameText = profileName.textContent;
let profileDescription = profileInfo.querySelector('.profile__description');
let profileDescriptionText = profileDescription.textContent;
console.log(profileNameText, profileDescriptionText);
const popupOpenButtonElement = profileInfo.querySelector('.profile__popup');
let popupName = popupElement.querySelector('.popup__name');
let popupNamePlaceholder = popupName.getAttribute('placeholder');
let popupDescription = popupElement.querySelector('.popup__description');
let popupDescriptionPlaceholder = popupDescription.getAttribute('placeholder');
console.log(popupNamePlaceholder, popupDescriptionPlaceholder);

// const togglePopupVisibility=function () {
//     popupElement.classList.toggle('popup_is-opened')
// }

let likeElelment = document.querySelectorAll('.element__like');

likeElelment.forEach(function (i) {
    i.addEventListener('click', function () {
        if (i.classList.contains('element__like_active')) {
            i.classList.remove('element__like_active');
            i.classList.add('element__like_off');
            return;
        }
        i.classList.add('element__like_active');
        i.classList.remove('element__like_off');

    })
}
);


const formSubmitHandler = function (evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
}

const setPopupInfo = function () {
    popupName.setAttribute('placeholder', profileNameText);
    popupDescription.setAttribute('placeholder', profileDescriptionText);
    console.log('brrrrrrr');
}



const openPopup = function (event) {
    console.log(event.target, event.currentTarget);
    popupElement.classList.add('popup_is-opened');
    console.log('opened popup cliked');
    setPopupInfo();
}

const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
    console.log('close popup cliked');
}

// const closePopupByClickOverlay = function (event) {
//     console.log(event.target, event.currentTarget);
//     if (event.target !== event.currentTarget) {
//         return;
//     }
//     closePopup();
// }



popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('submit', formSubmitHandler);
