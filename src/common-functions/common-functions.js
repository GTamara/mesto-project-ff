import { CSS_CONSTANTS } from "../constants/css-constants";

export const setLoading = (
		isLoading, 
		buttonTitle = 'Сохранить', 
		loadingStateStateTitle = 'Сохранение'
	) => {
	const openedPopup = document.querySelector(`.${CSS_CONSTANTS.popupIsOpened}`);
	const spinnerElement = openedPopup.querySelector(`.${CSS_CONSTANTS.spinner}`);
	const submitButtonTitleElement = openedPopup.querySelector(`.${CSS_CONSTANTS.buttonTitle}`);

	if (!openedPopup) {
		return;
	}
	if (isLoading) {
		spinnerElement.style.visibility = 'visible';
		submitButtonTitleElement.textContent = loadingStateStateTitle;
	} else {
		spinnerElement.style.visibility = 'hidden';
		submitButtonTitleElement.textContent = buttonTitle;
	}
}

export const isCardLikedByCurrentUser = (cardData, profileData) => {
	const currentUserId = profileData._id;
	const cardDataFromState = document.allCards.find(item => item._id === cardData._id);
	return cardDataFromState.likes.map(item => item._id).includes(currentUserId);
}