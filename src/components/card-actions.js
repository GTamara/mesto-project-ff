import { CardRequests } from "../api/card-requests";
import { CSS_CONSTANTS } from "../constants/css-constants";
import { POPUP_TYPES } from "../constants/popup-types";
import { Modal } from "./modal";
import { ShowFullSizeImage } from "./show-full-size-image";

export class CardActions {

	showFullSizeImageInstance = new ShowFullSizeImage();
	modal = new Modal(POPUP_TYPES.showFullSizeImage);
	cardRequests;

	constructor () {
		this.cardRequests = new CardRequests();
	}

	deleteCard = (card, cardData) => {
		
		this.cardRequests.deleteCard(cardData)
			.then(() => {
				card.remove();
			})
			.catch((err) => console.error(err));
	}

	toggleLike = (cardData, profileData,likeButtonElement, cardElement) => {
		const cardId = cardData._id;
		const shouldRemoveLike = this.isCardLikedByCurrentUserCallback(cardData, profileData);

		this.cardRequests.toggleLike(cardId, shouldRemoveLike)
			.then((response) => {
				document.allCards = [
					...document.allCards.filter(item => item._id !== cardId),
					response
				]
				console.log(response)
				this.setLikesQuantity(cardElement, response.likes.length)
				likeButtonElement.classList.toggle(CSS_CONSTANTS.likeActive);
			})
			.catch((err) => console.error(err));
	}

	isCardLikedByCurrentUserCallback (cardData, profileData) {
		const currentUserId = profileData._id;
		const cardDataFromState = document.allCards.find(item => item._id === cardData._id);
		return cardDataFromState.likes.map(item => item._id).includes(currentUserId);
	}

	cardClick = (clickedCard) => {
		this.showFullSizeImageInstance.preparePopupBeforeOpening(
			clickedCard,
			() => this.modal.open(),
		);
	}

	setLikesQuantity (cardElement, quantity) {
		cardElement.querySelector(`.${CSS_CONSTANTS.likesQuantity}`).textContent = quantity;
	}
}