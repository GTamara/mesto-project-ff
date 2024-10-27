import './styles/index.css';
import { initialCards } from './constants/initial-card-elements.js';
import { CSS_CONSTANTS } from './constants/css-constants.js';
import { POPUP_TYPES } from './constants/popup-types.js';
import { Modal } from './components/modal.js';
import { EditProfile } from './components/edit-profile.js';
import { AddCard } from './components/add-card.js';
import { ShowFullSizeImage } from './components/show-full-size-image.js';

const cardList = document.querySelector(`.${CSS_CONSTANTS.cardContainer}`);

const addCardInstance = new AddCard();
const editProfileInstance = new EditProfile();
const showFullSizeImageInstance = new ShowFullSizeImage();

const editProfilePopup = new Modal(POPUP_TYPES.editProfile, editProfileInstance.setNewProfileDataSubmit);
const addCardPopup = new Modal(POPUP_TYPES.addNewCard, addCardInstance.addNewCardPopupSubmit);
const showFullSizeImagePopup = new Modal(POPUP_TYPES.showFullSizeImage);

initialCards.forEach((cardData) => {
	const cardElement = addCardInstance.createCard(cardData);
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

// слушатель клика по карточке для открытия изображения
cardList.addEventListener( 
	'click', 
	(evt) => {
		const clickedCard = evt.target.closest(`.${CSS_CONSTANTS.cardItem}`);
		if (!!clickedCard) {
			showFullSizeImageInstance.preparePopupBeforeOpening(
				clickedCard,
				() => showFullSizeImagePopup.open(),
			);
		}
		
		evt.stopPropagation();
	},
);




