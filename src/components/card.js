import { CSS_CONSTANTS } from "../constants/css-constants";

export class Card {

	// создание новой карточки
	create = (cardData, profileData, cardClickCallback, deleteCallback, likeCallback) => {
		document.allCards.push(cardData);
		const cardElement = this.getNewCardElement(cardData);
		profileData = profileData ? profileData : document.profileData;

		if (this.isCardOwner(cardData, profileData)) {
			this.addDeletionCardAction (cardElement, cardData, deleteCallback);
		}

		this.addLikeAction(cardElement, cardData, profileData, likeCallback);

		cardElement.addEventListener( 
			'click', (evt) => {
				evt.stopPropagation();
				cardClickCallback(cardElement);
			},
		);

		return cardElement;
	}

	isCardLikedByCurrentUserCallback (cardData, profileData) {
		const currentUserId = profileData._id;
		return cardData.likes.map(item => item._id).includes(currentUserId);
	}

	isCardOwner (card, profileData) {
		return card.owner._id === profileData._id;
	}

	getNewCardElement (cardData) {
		const cardTemplate = document
			.querySelector('#card-template')
			.content;
		const cardElement = cardTemplate
			.querySelector(`.${CSS_CONSTANTS.cardItem}`)
			.cloneNode(true);

		const img = cardElement.querySelector(`.${CSS_CONSTANTS.cardImage}`);
		img.src = new URL(cardData.link);
		img.alt = cardData.name;

		cardElement.querySelector(`.${CSS_CONSTANTS.cardTitle}`).textContent = cardData.name;
		cardElement.querySelector(`.${CSS_CONSTANTS.likesQuantity}`).textContent = cardData.likes.length;
		return cardElement;
	}

	addDeletionCardAction (cardElement, cardData, deleteCallback) {
		const deleteButtonElement = cardElement
			.querySelector(`.${CSS_CONSTANTS.deleteCardButton}`)
		
		deleteButtonElement.addEventListener('click', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();
			deleteCallback(cardElement, cardData);
		});
		deleteButtonElement.classList.add(CSS_CONSTANTS.deleteCardButtonVisible);
	}

	addLikeAction (cardElement, cardData, profileData, likeCallback) {
		const isNewCard = !profileData;
		const likeButton = cardElement
			.querySelector(`.${CSS_CONSTANTS.likeButton}`)
		
		likeButton.addEventListener('click', (evt) => {
			evt.stopPropagation();
			likeCallback(cardData, profileData, likeButton, cardElement);
		});

		if (!isNewCard && this.isCardLikedByCurrentUserCallback (cardData, profileData)) {
			likeButton.classList.add(CSS_CONSTANTS.likeActive);
		}
	}
}