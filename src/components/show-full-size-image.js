import { CSS_CONSTANTS } from "../constants/css-constants";
import { POPUP_TYPES } from "../constants/popup-types";

const SHOW_FULL_SIZE_IMAGE_SELECTOTS = Object.freeze({
	popupImage: 'popup__image',
	popupCaption: 'popup__caption',
});

export class ShowFullSizeImage {

	preparePopupBeforeOpening (clickedCard, callback) {
		const imageElem = clickedCard.querySelector(`.${CSS_CONSTANTS.cardImage}`);
		const imageCaptionElem = clickedCard.querySelector(`.${CSS_CONSTANTS.cardTitle}`);

		this.setPopupData(
			{
				src: imageElem.src,
				alt: imageElem.alt,
				caption: imageCaptionElem.textContent,
			},
			callback,
		);
	}

	setPopupData (data, callback) {
		const popupElement = document.querySelector(`.${POPUP_TYPES.showFullSizeImage}`);
		const popupImageElem = popupElement.querySelector(`.${SHOW_FULL_SIZE_IMAGE_SELECTOTS.popupImage}`);
		const popupCaptionElem = popupElement.querySelector(`.${SHOW_FULL_SIZE_IMAGE_SELECTOTS.popupCaption}`);
		popupImageElem.src = data.src;
		popupImageElem.alt = data.alt || data.caption;
		popupCaptionElem.textContent = data.caption;

		popupImageElem.onload = callback;
	}
}