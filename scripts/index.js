const cardList = document.querySelector('.places__list');

function createCard (cardData, deleteCallback) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const img = cardElement.querySelector('.card__image');
	img.src = cardData.link;
	img.alt = cardData.name;
	cardElement.querySelector('.card__title').textContent = title;
	cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCallback(cardElement));
	return cardElement;
  }

function deleteCard (cardElement) {
	// const deleteBtn = event.target;
	// const cardContainer = deleteBtn.closest('.card');
	cardElement.remove();
}

initialCards.forEach((cardData) => {
	const card = createCard(cardData, deleteCard);
	cardList.append(card)
});