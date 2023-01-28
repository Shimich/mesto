export default class UserInfo {
    constructor(nameElementSelector, descriptionElementSelector, avatarSelector) {
        this._userName = document.querySelector(nameElementSelector);
        this._userDescription = document.querySelector(descriptionElementSelector);
        this._userAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            description: this._userDescription.textContent
        };
    }

    setUserInfo(newName, newDescription) {
        this._userName.textContent = newName;
        this._userDescription.textContent = newDescription;
    }

    setUserAvatar(link){
        this._userAvatar.src = link;
    }
}