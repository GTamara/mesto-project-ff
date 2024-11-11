import { CSS_CONSTANTS } from "../../constants/css-constants";

export const setLoading = (isLoading) => {
	debugger
	const openedPopup = document.querySelector(`.${CSS_CONSTANTS.popupIsOpened}`);
	const spinnerElement = openedPopup.querySelector(`.${CSS_CONSTANTS.spinner}`);
	const submitButtonTitleElement = openedPopup.querySelector(`.${CSS_CONSTANTS.buttonTitle}`);

	if (!openedPopup) {
		return;
	}
	if (isLoading) {
		spinnerElement.style.visibility = 'visible';
		submitButtonTitleElement.textContent = 'Сохранение';
	} else {
		spinnerElement.style.visibility = 'hidden';
		submitButtonTitleElement.textContent = 'Сохранить';
	}
}