import { CSS_CONSTANTS } from "../constants/css-constants";

export class Modal {

	create = (modalType, submitCallback) => {
		const popup = document.querySelector(`.${modalType}`)

		popup.addEventListener(
			'click', 
			(evt) => this.closePopupEventHandler(evt, popup),
		);

		document.addEventListener(
			'keydown', 
			(evt) => {
				if (evt.code === 'Escape') {
					this.close(popup);
				}
			},
		);

		// обработчики закрытия попапа END
		if (!!submitCallback) {
			popup.querySelector(`.${CSS_CONSTANTS.form}`)
				.addEventListener(
					'submit', 
					(evt) => {
						submitCallback();
						evt.preventDefault();
						this.close(popup);
					}
				);
		}
	}

	closePopupEventHandler (event, popup) {
		if (
			event.target.classList.contains(CSS_CONSTANTS.popupBackdrop)
			|| event.target.classList.contains(CSS_CONSTANTS.closePopupButton)
		) {
			this.close(popup);
			event.stopPropagation();
		}
	}

	open (modalType) {
		const popup = document.querySelector(`.${modalType}`)
		popup.classList.add(CSS_CONSTANTS.popupIsopened);
	}

	close (popup) {
		popup.classList.remove(CSS_CONSTANTS.popupIsopened);
	}
}