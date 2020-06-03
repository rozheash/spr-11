export class Api {

    constructor(groupId, token) {
        this.groupId = groupId;
        this.token = token;
    }

    getUserInfo() {
        return fetch(`https://praktikum.tk/${this.groupId}/users/me`, {
            headers: {
                authorization: this.token
            }
        })
        .then (res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getCards() {
        return fetch(`https://praktikum.tk/${this.groupId}/cards`, {
            headers: {
                authorization: this.token
            }
        })
        .then (res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    patchUserInfo(name, about) {
        return fetch(`https://praktikum.tk/${this.groupId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then (res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

}