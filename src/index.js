import './styles/index.css';
import { initialCards } from './constants/initial-card-elements.js';

const cardList = document.querySelector('.places__list');

function createCard (cardData, deleteCallback) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const img = cardElement.querySelector('.card__image');
	img.src = cardData.link;
	img.alt = cardData.name;
	cardElement.querySelector('.card__title').textContent = cardData.name;
	cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCallback(cardElement));
	return cardElement;
  }

function deleteCard (cardElement) {
	cardElement.remove();
}

initialCards.forEach((cardData) => {
	const card = createCard(cardData, deleteCard);
	cardList.append(card)
});

console.log(initialCards)