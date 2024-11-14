import { CardRequests } from "../api/card-requests";
import { setLoading } from "../common-functions/common-functions";
import { CSS_CONSTANTS } from "../constants/css-constants";

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
		setLoading(true);
		const newCardData = this.getFormData();
		return new CardRequests().createCard(newCardData)
			.then(response => {
				const newCard = this.card.create(
					response,
					null,
					this.cardActions.cardClick,
					this.cardActions.getDeleteConfirmation,
					this.cardActions.toggleLike,
				);
				this.addNewCardToCardContainer(newCard);
			})
			.catch(err => console.error(err))
			.finally(() => {
				setLoading(false);
			});
	}

	addNewCardToCardContainer (cardElement) {
		this.cardList.prepend(cardElement);
	}
}