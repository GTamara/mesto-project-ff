import { CSS_CONSTANTS } from "../constants/css-constants";

export class Modal {

	popup = undefined;

	constructor (modalType, submitCallback) {
		this.popup = document.querySelector(`.${modalType}`)

		this.popup.addEventListener(
			'click', 
			this.closePopupEventHandler,
		);

		// обработчики закрытия попапа END
		if (!!submitCallback) {
			this.popup.querySelector(`.${CSS_CONSTANTS.form}`)
				.addEventListener(
					'submit', 
					(evt) => {
						submitCallback();
						evt.preventDefault();
						this.close(this.popup);
					}
				);
		}
	}

	close (popup) {
		popup.classList.remove(CSS_CONSTANTS.popupIsOpened);
		document.removeEventListener(
			'keydown', 
			this.closeByEscape,
		);
	}

	closePopupEventHandler = (event) => {
		if (
			event.target.classList.contains(CSS_CONSTANTS.popupBackdrop)
			|| event.target.classList.contains(CSS_CONSTANTS.closePopupButton)
		) {
			this.close(this.popup);
			event.stopPropagation();
		}
	}

	open () {
		this.popup.classList.add(CSS_CONSTANTS.popupIsOpened);
		document.addEventListener(
			'keydown', 
			this.closeByEscape,
		);
	}

	closeByEscape = (evt) => {
		if (evt.code === 'Escape') {
			this.close(this.popup);
		}
	}
}