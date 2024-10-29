import { CSS_CONSTANTS } from "../constants/css-constants";

export class Card {

	// создание новой карточки
	create (cardData, cardClickCallback, deleteCallback, likeCallback) {
		const cardTemplate = document.querySelector('#card-template').content;
		const cardElement = cardTemplate.querySelector(`.${CSS_CONSTANTS.cardItem}`).cloneNode(true);
		const img = cardElement.querySelector(`.${CSS_CONSTANTS.cardImage}`);
		img.src = cardData.link;
		img.alt = cardData.name;
		cardElement.querySelector(`.${CSS_CONSTANTS.cardTitle}`).textContent = cardData.name;

		cardElement
			.querySelector('.card__delete-button')
			.addEventListener('click', (evt) => deleteCallback(evt, cardElement));

		cardElement
			.querySelector('.card__like-button')
			.addEventListener('click', (evt) => likeCallback(evt));

		cardElement.addEventListener( 
			'click', (evt) => cardClickCallback(evt, cardElement),
		);

		return cardElement;
	}
}