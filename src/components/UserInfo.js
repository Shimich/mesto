export default class UserInfo {
    constructor(nameElementSelector, descriptionElementSelector) {
        this._userName = document.querySelector(nameElementSelector);
        this._userDescription = document.querySelector(descriptionElementSelector);
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
}