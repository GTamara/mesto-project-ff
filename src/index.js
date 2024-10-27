import './styles/index.css';
import { initialCards } from './constants/initial-card-elements.js';
import { CSS_CONSTANTS } from './constants/css-constants.js';
import { POPUP_TYPES } from './constants/popup-types.js';
import { Modal } from './components/modal.js';
import { EditProfile } from './components/edit-profile.js';
import { AddCard } from './components/add-card.js';
import { Card } from './components/card.js';
import { CardActions } from './components/card-actions.js';

const addCardInstance = new AddCard();
const editProfileInstance = new EditProfile();

const editProfilePopup = new Modal(POPUP_TYPES.editProfile, editProfileInstance.setNewProfileDataSubmit);
const addCardPopup = new Modal(POPUP_TYPES.addNewCard, addCardInstance.addNewCardPopupSubmit);

const card = new Card();
const cardActions = new CardActions();

initialCards.forEach((cardData) => {
	const cardElement = card.create(
		cardData,
		cardActions.cardClick,
		cardActions.deleteCard,
		cardActions.toggleLike,
	);
	
	addCardInstance.addNewCardToCardContainer(cardElement);
});

// слушатель для кнопки редактирования профиля
document.querySelector(`.${CSS_CONSTANTS.editProfileButton}`) 
	.addEventListener(
		'click', 
		() => {
			editProfileInstance.preparePopupBeforeOpening();
			editProfilePopup.open();
		},
	);

// слушатель для кнопки добавления карточки
document.querySelector(`.${CSS_CONSTANTS.addNewCardButton}`) 
	.addEventListener(
		'click', 
		() => {
			addCardInstance.preparePopupBeforeOpening();
			addCardPopup.open();
		},
	);





