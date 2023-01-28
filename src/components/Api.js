export default class Api {
    constructor({ headers, cohortURL }) {
        this._headers = headers;
        this._cohortURL = cohortURL;;
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();// возвращаем промис
        }
        else {
            return Promise.reject(`Что-то пошло не так: ${res.status}`);
        }
    } // проверка ответа

    getInitialCards() {
        return fetch(`${this._cohortURL}/cards`, {
            headers: this._headers
        })
            .then(this._getResponse)
    }// получение карточек с сервера

    getUserInfo() {
        return fetch(`${this._cohortURL}/users/me`, {
            headers: this._headers
        }).then(this._getResponse)
    }// получение информации о пользователе

    like(id) {
        return fetch(`${this._cohortURL}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._getResponse)
    }// полное обновление лайка

    unlike(id) {
        return fetch(`${this._cohortURL}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponse)
    }

    deleteCard(id) {
        return fetch(`${this._cohortURL}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => { this._getResponse(res, 'удаление') })
    }

    patchUserInfo(name, description) {
        return fetch(`${this._cohortURL}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: description
            })
        })
            .then(this._getResponse)
    }// отправка редактированной информации

    patchAvatarInfo(link) {
        return fetch(`${this._cohortURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(this._getResponse)
    }

    postCard(link, name) {
        return fetch(`${this._cohortURL}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._getResponse)
    }

}