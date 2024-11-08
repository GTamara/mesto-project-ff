import { BASE_HTTP_HEADERS, BASE_SERVER_URL } from "./config";

export class CardRequests {
	
	getInitialCards () {
		return fetch(
			`${BASE_SERVER_URL}cards`,
			{
				headers: BASE_HTTP_HEADERS,
			}
		).then(res => res.json())
		// .then((result) => {
		// 	return {
		// 		name: "Иваново",
		// 		link: new URL(
		// 			"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
		// 		),
		// 	};
		// }); 
	}

	createCard () {

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