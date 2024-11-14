import { CardRequests } from "../api/card-requests";
import { isCardLikedByCurrentUser, setLoading } from "../common-functions/common-functions";
import { CSS_CONSTANTS } from "../constants/css-constants";
import { POPUP_TYPES } from "../constants/popup-types";
import { Modal } from "./modal";
import { ShowFullSizeImage } from "./show-full-size-image";

export class CardActions {

	cardRequests;
	showFullSizeImageInstance = new ShowFullSizeImage();
	fullSIzeImgPopup = new Modal(POPUP_TYPES.showFullSizeImage);

	constructor () {
		this.cardRequests = new CardRequests();
	}

	getDeleteConfirmation = (card, cardData) => {
		const confirmPopup = new Modal(
			POPUP_TYPES.confirm, 
			undefined, 
			() => this.deleteCard(card, cardData),
		);
		confirmPopup.open();
		
	}

	// удалить карточку
	deleteCard = (card, cardData) => {
		setLoading(true, 'Да', 'Удаление');
		
		return this.cardRequests.deleteCard(cardData)
			.then(() => {
				card.remove();
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}

	// поставить / снять лайк
	toggleLike = (cardData, profileData,likeButtonElement, cardElement) => {
		const cardId = cardData._id;
		const shouldRemoveLike = isCardLikedByCurrentUser(cardData, profileData);

		this.cardRequests.toggleLike(cardId, shouldRemoveLike)
			.then((response) => {
				document.allCards = [
					...document.allCards.filter(item => item._id !== cardId),
					response
				]
				this.setLikesQuantity(cardElement, response.likes.length)
				likeButtonElement.classList.toggle(CSS_CONSTANTS.likeActive);
			})
			.catch((err) => console.error(err));
	}

	setLikesQuantity (cardElement, quantity) {
		cardElement.querySelector(`.${CSS_CONSTANTS.likesQuantity}`).textContent = quantity;
	}

	// Открыть полноразмерную картинку
	cardClick = (clickedCard) => {
		this.showFullSizeImageInstance.preparePopupBeforeOpening(
			clickedCard,
			() => this.fullSIzeImgPopup.open(),
		);
	}
}