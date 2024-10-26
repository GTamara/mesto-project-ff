import { CSS_CONSTANTS } from "../constants/css-constants";

const ADD_PROFILE_CSS_SELECTORS = {
	formName: 'new-place',
	cardsContainer: 'places__list',
	likeActive: 'card__like-button_is-active',
	// currentProfileName: 'profile__title',
	// currentProfileJob: 'profile__description',

}

export class AddCard {

	formElement = document.forms[ADD_PROFILE_CSS_SELECTORS.formName];
	submitButton = this.formElement.querySelector(`.${CSS_CONSTANTS.submitButton}`);

	// constructor() {
	// 	this.name = ADD_PROFILE_CSS_SELECTORS.formName;
	// }

	preparePopupBeforeOpening () {
		this.formElement.reset();
	}

	getFormData() {
		const formElement = document.forms[ADD_PROFILE_CSS_SELECTORS.formName];
		const placeNameInput = formElement.elements['place-name'];
		const linkInput = formElement.elements.link;

		return {
			name: placeNameInput.value,
			link: linkInput.value,
		}
	}

	deleteCard(evt, card) {
		evt.stopPropagation();
		card.remove();
		
	}

	createCard = (cardData) => {
		const cardTemplate = document.querySelector('#card-template').content;
		const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
		const img = cardElement.querySelector('.card__image');
		img.src = cardData.link;
		img.alt = cardData.name;
		cardElement.querySelector('.card__title').textContent = cardData.name;
		cardElement
			.querySelector('.card__delete-button')
			.addEventListener('click', (evt) => this.deleteCard(evt, cardElement));
		cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
			evt.target.classList.toggle(ADD_PROFILE_CSS_SELECTORS.likeActive);
		});
		return cardElement;
	}

	addNewCardPopupSubmit = () => {
		// https://www.shutterstock.com/shutterstock/photos/2479863909/display_1500/stock-photo-aerial-view-of-lush-river-delta-2479863909.jpg
		const newCardData = this.getFormData();
		const card = this.createCard(newCardData);
		this.addNewCardToCardContainer(card);
	}

	addNewCardToCardContainer (cardElement) {
		const cardList = document.querySelector(`.${ADD_PROFILE_CSS_SELECTORS.cardsContainer}`);
		cardList.prepend(cardElement);
	}
}