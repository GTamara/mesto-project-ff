import { CardRequests } from "../api/card-requests";
import { CSS_CONSTANTS } from "../constants/css-constants";
import { Card } from "./card";
import { CardActions } from "./card-actions";

const ADD_NEW_CARD_CSS_SELECTORS = Object.freeze({
	formName: 'new-place',
	cardsContainer: 'places__list',
});

export class AddCard {

	card = undefined;
	cardActions = undefined;

	constructor (card, cardActions) {
		this.card = card;
		this.cardActions = cardActions;
	}

	formElement = document.forms[ADD_NEW_CARD_CSS_SELECTORS.formName];
	submitButton = this.formElement.querySelector(`.${CSS_CONSTANTS.submitButton}`);
	cardList = document.querySelector(`.${ADD_NEW_CARD_CSS_SELECTORS.cardsContainer}`);

	preparePopupBeforeOpening () {
		this.formElement.reset();
	}

	getFormData() {
		const placeNameInput = this.formElement.elements['place-name'];
		const linkInput = this.formElement.elements.link;

		return {
			name: placeNameInput.value,
			link: linkInput.value,
		}
	}

	addNewCardPopupSubmit = () => {
		const newCardData = this.getFormData();
		new CardRequests().createCard(newCardData)
			.then(response => {
				const newCard = this.card.create(
					response,
					this.cardActions.cardClick,
					this.cardActions.deleteCard,
					this.cardActions.toggleLike,
				);
				this.addNewCardToCardContainer(newCard);
			})
			.catch(err => console.error(err));
	}

	addNewCardToCardContainer (cardElement) {
		this.cardList.prepend(cardElement);
	}
}