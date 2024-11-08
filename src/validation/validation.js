export class FormValidation {

	config;

	constructor (config) {
		this.config = config;
	}

	enableValidation () {
		const formsArray = Array.from(document.querySelectorAll(this.config.formSelector));
		formsArray.forEach(form => {
			// form.addEventListener('submit', evt => evt.preventDefault());
			this.setEventListenersForFormFields(form);
		})
	}

	clearValidation (form) {
		const fieldsArray = Array.from(form.querySelectorAll(this.config.inputSelector));
		const buttonElement = form.querySelector(this.config.submitButtonSelector);

		fieldsArray.forEach(field => {
			this.toggleErrorVisibility(true, field);
		});

		buttonElement.disabled = false;
		this.toggleButtonState (true, buttonElement);
	}

	setEventListenersForFormFields (form) {
		const fieldsArray = Array.from(form.querySelectorAll(this.config.inputSelector));
		const buttonElement = form.querySelector(this.config.submitButtonSelector);

		fieldsArray.forEach(field => {
			field.addEventListener('input', () => {
				this.checkFieldValidity(field);
				const isFormInvalid = fieldsArray.some(field => !field.validity.valid);
				this.toggleButtonState(!isFormInvalid, buttonElement);
			});
		});
	}

	checkFieldValidity (field) {
		const val = field.value;
		// const regexp = /^[\wа-яёА-Я\s\-]+$/;
		// const res = /^[\wа-яёА-Я\s\-]+$/.test(val);
		if (field.validity.valid) {
			this.toggleErrorVisibility(true, field);
		} else {

			if (field.validity.patternMismatch) {
				field.setCustomValidity(field.dataset.errorMessage);
				
			} else {
				field.setCustomValidity('');
			}
			this.toggleErrorVisibility(false, field, field.validationMessage);
		}
	}

	toggleErrorVisibility (isValid, field, errorMessage) {
		const errorMessageElement = field.nextElementSibling;

		if (isValid) {
			errorMessageElement.classList.remove(this.config.errorClass);
			errorMessageElement.textContent = '';
		} else {
			errorMessageElement.classList.add(this.config.errorClass);
			errorMessageElement.textContent = errorMessage;
		}
	}

	toggleButtonState (isFormValid, buttonElement) {
		if (isFormValid) {
			buttonElement.classList.remove(this.config.inactiveButtonClass);
			buttonElement.disabled = false;
		} else {
			buttonElement.classList.add(this.config.inactiveButtonClass);
			buttonElement.disabled = true;
		}
	};
}