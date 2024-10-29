import { POPUP_TYPES } from "../constants/popup-types";
import { Modal } from "./modal";
import { ShowFullSizeImage } from "./show-full-size-image";

const CARD_ACTIONS_SELECTORS = Object.freeze({
	likeActive: 'card__like-button_is-active',
});

export class CardActions {

	showFullSizeImageInstance = new ShowFullSizeImage();
	modal = new Modal(POPUP_TYPES.showFullSizeImage);

	deleteCard(evt, card) {
		evt.stopPropagation();
		card.remove();
		
	}

	toggleLike(evt) {
		evt.target.classList.toggle(CARD_ACTIONS_SELECTORS.likeActive);
		evt.stopPropagation();
	}

	cardClick = (evt, clickedCard) => {
		this.showFullSizeImageInstance.preparePopupBeforeOpening(
			clickedCard,
			() => this.modal.open(),
		);
		
		evt.stopPropagation();
	}

}