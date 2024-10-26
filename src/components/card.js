export class Card {

	deleteCard (elem) {
		elem.remove();
	}

	createCard = (cardData, callback) => {
		const cardTemplate = document.querySelector('#card-template').content;
		const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
		const img = cardElement.querySelector('.card__image');
		img.src = cardData.link;
		img.alt = cardData.name;
		// debugger
		console.log(this.test)
		cardElement.querySelector('.card__title').textContent = cardData.name;
		cardElement
			.querySelector('.card__delete-button')
			.addEventListener('click', () => this.deleteCard(cardElement));
		return cardElement;
	  }
	
	  
}

// export const TestCard = (function () {

// 	const test1 = function () {
// 		console.log('TEST1 func')
// 	}

// 	function test2 () {
// 		console.log('TEST2 func')
// 	}

// }())
