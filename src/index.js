import './styles/index.css';
import { CSS_CONSTANTS } from './constants/css-constants.js';
import { POPUP_TYPES } from './constants/popup-types.js';
import { Modal } from './components/modal.js';
import { EditProfile } from './components/edit-profile.js';
import { AddCard } from './components/add-card.js';
import { Card } from './components/card.js';
import { CardActions } from './components/card-actions.js';
import { FormValidation } from './validation/validation.js';
import { VALIDATION_CONFIG } from './validation/validation-config.js';
import { CardRequests } from './api/card-requests.js';
import { ProfileRequests } from './api/profile-requests.js';
import { UpdateAvatar } from './components/update-avatar.js';

const card = new Card();
const cardActions = new CardActions();
const addCardInstance = new AddCard(card, cardActions);
const editProfileInstance = new EditProfile();
const updateAvatarInstance = new UpdateAvatar();

const editProfilePopup = new Modal(POPUP_TYPES.editProfile, editProfileInstance.setNewProfileDataSubmit);
const addCardPopup = new Modal(POPUP_TYPES.addNewCard, addCardInstance.addNewCardPopupSubmit);
const updateAvatarPopup = new Modal(POPUP_TYPES.updateAvatar, updateAvatarInstance.updateAvatarSubmit);

const validation = new FormValidation(VALIDATION_CONFIG);
document.allCards = [];

// Получить карточки при загрузке страницы
// получить данные профиля
Promise.all([
	new CardRequests().getInitialCards(),
	new ProfileRequests().getProfileData(),
]).then(([cards, profileData]) => {
	document.profileData = profileData;
	cards.forEach(item => {
		const cardElement = card.create(
			item,
			profileData,
			cardActions.cardClick,
			cardActions.getDeleteConfirmation,
			cardActions.toggleLike,
		);
		addCardInstance.addNewCardToCardContainer(cardElement);
	});

	editProfileInstance.setProfileData(profileData);
	updateAvatarInstance.setProfileAvatar(profileData.avatar);
}).catch(err => console.error(err));

// слушатель для кнопки редактирования профиля
document.querySelector(`.${CSS_CONSTANTS.editProfileButton}`) 
	.addEventListener(
		'click', 
		() => {
			editProfileInstance.preparePopupBeforeOpening();
			const formElement = editProfilePopup.popup.querySelector(`.${CSS_CONSTANTS.form}`);
			validation.cleanForm(formElement);
			editProfilePopup.open();
		},
	);

// слушатель для кнопки добавления карточки
document.querySelector(`.${CSS_CONSTANTS.addNewCardButton}`) 
	.addEventListener(
		'click', 
		() => {
			addCardInstance.preparePopupBeforeOpening();
			const formElement = addCardPopup.popup.querySelector(`.${CSS_CONSTANTS.form}`);
			validation.cleanForm(formElement);
			addCardPopup.open();
		},
	);

document.querySelector(`.${CSS_CONSTANTS.profileAvatar}`)
	.addEventListener(
		'click', 
			() => {
			updateAvatarInstance.preparePopupBeforeOpening();
			const formElement = updateAvatarPopup.popup.querySelector(`.${CSS_CONSTANTS.form}`);
			validation.cleanForm(formElement);
			updateAvatarPopup.open();
		}
	);

// const buttonClickHandler = (ationInstance, actionPopup) => {
// 	updateAvatarInstance.preparePopupBeforeOpening();
// 	const formElement = updateAvatarPopup.popup.querySelector(`.${CSS_CONSTANTS.form}`);
// 	validation.cleanForm(formElement);
// 	updateAvatarPopup.open();
// }

validation.enableValidation();




