const EDIT_PROFILE_CSS_SELECTORS = Object.freeze({
	formName: 'edit-profile',
	currentProfileName: 'profile__title',
	currentProfileJob: 'profile__description',
});

export class EditProfile {

	open () {
		this.fillPopupWithProfileData();
		popup.classList.remove(CSS_CONSTANTS.popupHidden);
	}
	
	preparePopupBeforeOpening () {
		// fill popup with profile data
		const currentProfileData = this.getProfileData();
		this.setFormData(currentProfileData);
	}

	getFormData () {
		const formElement = document.forms[EDIT_PROFILE_CSS_SELECTORS.formName];
		const nameInput = formElement.elements.name;
		const jobInput = formElement.elements.description;

		return {
			name: nameInput.value,
			job: jobInput.value,
		}
	}

	setNewProfileDataSubmit = () => {
		const formData = this.getFormData();
		this.setProfileData(formData);
	}

	setFormData (data) {
		const formElement = document.forms[EDIT_PROFILE_CSS_SELECTORS.formName];
		const nameInput = formElement.elements.name;
		const jobInput = formElement.elements.description;
		nameInput.value = data.name;
		jobInput.value = data.job;
	}

	getProfileData () {
		const currentProfileNameElement = document.querySelector(`.${EDIT_PROFILE_CSS_SELECTORS.currentProfileName}`); 
		const currentProfileJobElement = document.querySelector(`.${EDIT_PROFILE_CSS_SELECTORS.currentProfileJob}`); 
		
		return {
			name: currentProfileNameElement.textContent || '',
			job: currentProfileJobElement.textContent || '',
		}
	}

	setProfileData (data) {
		const currentProfileNameElement = document.querySelector(`.${EDIT_PROFILE_CSS_SELECTORS.currentProfileName}`); 
		const currentProfileJobElement = document.querySelector(`.${EDIT_PROFILE_CSS_SELECTORS.currentProfileJob}`); 

		currentProfileNameElement.textContent = data.name;
		currentProfileJobElement.textContent = data.job;
	}

}
