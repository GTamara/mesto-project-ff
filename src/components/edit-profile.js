import { setLoading } from "../api/common-functions/set-loading";
import { ProfileRequests } from "../api/profile-requests";

const EDIT_PROFILE_CSS_SELECTORS = Object.freeze({
	formName: 'edit-profile',
	currentProfileName: 'profile__title',
	currentProfileJob: 'profile__description',
	profileAvatar: 'profile__image',
});

export class EditProfile {

	profileRequests = new ProfileRequests();

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
			about: jobInput.value,
		}
	}

	setNewProfileDataSubmit = () => {
		setLoading(true);
		const formData = this.getFormData();
		
		return this.profileRequests.updateProfileData(formData)
			.then((response) => {

				this.setProfileData(response);
			})
			.catch(err => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
		
	}

	setFormData (data) {
		const formElement = document.forms[EDIT_PROFILE_CSS_SELECTORS.formName];
		const nameInput = formElement.elements.name;
		const jobInput = formElement.elements.description;
		nameInput.value = data.name;
		jobInput.value = data.about;
	}

	getProfileData () {
		const currentProfileNameElement = document.querySelector(`.${EDIT_PROFILE_CSS_SELECTORS.currentProfileName}`); 
		const currentProfileJobElement = document.querySelector(`.${EDIT_PROFILE_CSS_SELECTORS.currentProfileJob}`); 
		
		return {
			name: currentProfileNameElement.textContent || '',
			about: currentProfileJobElement.textContent || '',
		}
	}

	setProfileData (data) {
		const currentProfileNameElement = document.querySelector(`.${EDIT_PROFILE_CSS_SELECTORS.currentProfileName}`); 
		const currentProfileJobElement = document.querySelector(`.${EDIT_PROFILE_CSS_SELECTORS.currentProfileJob}`); 

		currentProfileNameElement.textContent = data.name;
		currentProfileJobElement.textContent = data.about;
	}

	setProfileAvatar (link) {
		const avatarElement = document.querySelector(`.${EDIT_PROFILE_CSS_SELECTORS.profileAvatar}`);
		avatarElement.style.backgroundImage = `url(${link})`;
	}

}
