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

	// create = (modalType, submitCallback) => {
	// 	const popup = document.querySelector(`.${modalType}`)

	// 	popup.addEventListener(
	// 		'click', 
	// 		(evt) => this.closePopupEventHandler(evt, popup),
	// 	);

	// 	document.addEventListener(
	// 		'keydown', 
	// 		(evt) => {
	// 			if (evt.code === 'Escape') {
	// 				this.close(popup);
	// 			}
	// 		},
	// 	);

	// 	// обработчики закрытия попапа END
	// 	if (!!submitCallback) {
	// 		popup.querySelector(`.${CSS_CONSTANTS.form}`)
	// 			.addEventListener(
	// 				'submit', 
	// 				(evt) => {
	// 					submitCallback();
	// 					evt.preventDefault();
	// 					this.close(popup);
	// 				}
	// 			);
	// 	}

	// 	return popup;
	// }

	close (popup) {
		console.log('close')

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
			console.log('this', this)
			this.close(this.popup);
			event.stopPropagation();
		}
	}

	open () {
		// const popup = document.querySelector(`.${modalType}`)
		this.popup.classList.add(CSS_CONSTANTS.popupIsOpened);
		document.addEventListener(
			'keydown', 
			this.closeByEscape,
		);
	}



	closeByEscape = (evt) => {
		if (evt.code === 'Escape') {
			console.log('closeByEscape this', this)
			console.log('closeByEscape this.popup', this.popup)
			this.close(this.popup);
		}
	}
}