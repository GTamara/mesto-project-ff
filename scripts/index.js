const cardList = document.querySelector('.places__list');

function createCard (title, imgLink, deleteCallback) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
	cardElement.querySelector('.card__image').src = imgLink;
	cardElement.querySelector('.card__image').alt = title;
	cardElement.querySelector('.card__title').textContent = title;
	cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
	cardList.append(cardElement)
  }

function deleteCard (event) {
	const deleteBtn = event.target;
	const cardContainer = deleteBtn.closest('.card');
	cardContainer.remove();
}

window.onload = () => {
	initialCards.forEach((card) => {
		createCard(card.name, card.link, deleteCard);
	});
}