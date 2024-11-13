import { ProfileRequests } from "../api/profile-requests";
import { setLoading } from "../common-functions/common-functions";

const EDIT_AVATAR_CSS_SELECTORS = Object.freeze({
	formName: 'avatar',
	newAvatarLink: 'profile__title',
	profileAvatar: 'profile__image',
});

export class UpdateAvatar {
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzcDHE2e_esB-oszjgUzyLYva71cAjxSqmlw&s

	profileRequests = new ProfileRequests();
	formElement = document.forms[EDIT_AVATAR_CSS_SELECTORS.formName];

	preparePopupBeforeOpening () {
		this.formElement.reset();
	}

	getFormData = () => {
		const linkInput = this.formElement.elements.link;
		return linkInput.value;
	}

	updateAvatarSubmit = () => {
		setLoading(true);
		const imageUrl = this.getFormData();

		return this.profileRequests.updateAvatar(imageUrl)
			.then((response) => {

				this.setProfileAvatar(response.avatar);
			})
			.catch(err => {
				console.error(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}

	setProfileAvatar (link) {
		const avatarElement = document.querySelector(`.${EDIT_AVATAR_CSS_SELECTORS.profileAvatar}`);
		avatarElement.style.backgroundImage = `url(${link})`;
	}

}