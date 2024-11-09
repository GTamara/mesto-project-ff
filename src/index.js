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

const card = new Card();
const cardActions = new CardActions();
const addCardInstance = new AddCard(card, cardActions);
const editProfileInstance = new EditProfile();

const editProfilePopup = new Modal(POPUP_TYPES.editProfile, editProfileInstance.setNewProfileDataSubmit);
const addCardPopup = new Modal(POPUP_TYPES.addNewCard, addCardInstance.addNewCardPopupSubmit);

const validation = new FormValidation(VALIDATION_CONFIG);

// Получить карточки при загрузке страницы
// получить данные профиля
Promise.all([
	new CardRequests().getInitialCards(),
	new ProfileRequests().getProfileData(),
]).then(([cards, profileData]) => {
	cards.forEach(item => {
		const cardData = {
			name: item.name,
			link: new URL(item.link),
		};
		const cardElement = card.create(
			cardData,
			cardActions.cardClick,
			cardActions.deleteCard,
			cardActions.toggleLike,
		);
		addCardInstance.addNewCardToCardContainer(cardElement);
	});

	editProfileInstance.setProfileData(profileData);
	editProfileInstance.setProfileAvatar(profileData.avatar);
}).catch(err => console.log(err));

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


validation.enableValidation();




