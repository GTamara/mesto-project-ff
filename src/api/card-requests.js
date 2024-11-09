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

	updateCard () {

	}

	deleteCard () {

	}

	// .then(res => res.json())
	// .then((result) => {
	//   console.log(result);
	// }); 




	// .then((result) => {
	// 	// обрабатываем результат
	//   })
	//   .catch((err) => {
	// 	console.log(err); // выводим ошибку в консоль
	//   });
}