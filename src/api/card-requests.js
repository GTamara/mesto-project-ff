import { BASE_HTTP_HEADERS, BASE_SERVER_URL } from "./config";

export class CardRequests {
	
	getInitialCards () {
		return fetch(
			`${BASE_SERVER_URL}cards`,
			{
				headers: BASE_HTTP_HEADERS,
			}
		).then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка получения карточек: ${res.status} ${res.statusText}`);
		});
	}

	createCard (payload) {
		return fetch(
			`${BASE_SERVER_URL}cards`,
			{
				headers: {
					...BASE_HTTP_HEADERS,
					'Content-Type': 'application/json; charset=utf-8',
				},
				method: 'POST',
				body: JSON.stringify(payload),
			}
		).then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка при добавлении новой карточки: ${res.status} ${res.statusText}`);
		});
	}

	deleteCard (cardData) {
		return fetch(
			`${BASE_SERVER_URL}cards/${cardData._id}`,
			{
				headers: BASE_HTTP_HEADERS,
				method: 'DELETE',
			}
		).then(res => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка при удалении карточки: ${res.status} ${res.statusText}`);
		});
	}

	toggleLike (cardId, shouldRemoveLike) {

		if (shouldRemoveLike) {
			return fetch(
				`${BASE_SERVER_URL}cards/likes/${cardId}`,
				{
					headers: BASE_HTTP_HEADERS,
					method: 'DELETE',
				}
			).then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка доавления лайка: ${res.status} ${res.statusText}`);
			});
		} else {
			return fetch(
				`${BASE_SERVER_URL}cards/likes/${cardId}`,
				{
					headers: BASE_HTTP_HEADERS,
					method: 'PUT',
				}
			).then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка удаления лайка: ${res.status} ${res.statusText}`);
			});
		}
	}

}