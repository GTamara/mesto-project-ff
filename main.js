(()=>{"use strict";const e=Object.freeze({popupHidden:"popup-hidden",popupIsOpened:"popup_is-opened",closePopupButton:"popup__close",editProfileButton:"profile__edit-button",addNewCardButton:"profile__add-button",popupBackdrop:"popup",form:"popup__form",submitButton:"popup__button",spinner:"popup-button__spinner",buttonTitle:"popup-button__title",cardContainer:"places__list",cardItem:"card",likeButton:"card__like-button",likeActive:"card__like-button_is-active",deleteCardButton:"card__delete-button",deleteCardButtonVisible:"card__delete-button_visible",cardImage:"card__image",cardTitle:"card__title",likesQuantity:"card__like-quantity",profileAvatar:"profile__image"}),t="popup_type_image";class o{popup=void 0;constructor(t,o,r){this.popup=document.querySelector(`.${t}`),this.popup.addEventListener("click",this.closePopupEventHandler),o&&this.popup.querySelector(`.${e.form}`).addEventListener("submit",(e=>(e.preventDefault(),o().finally((()=>{this.close(this.popup)})),Promise.resolve(!0)))),r&&this.popup.querySelector(`.${e.submitButton}`).addEventListener("click",(e=>(r().finally((()=>{this.close(this.popup)})),Promise.resolve(!0))))}close(t){t.classList.remove(e.popupIsOpened),document.removeEventListener("keydown",this.closeByEscape)}closePopupEventHandler=t=>{(t.target.classList.contains(e.popupBackdrop)||t.target.classList.contains(e.closePopupButton))&&(this.close(this.popup),t.stopPropagation())};open(){this.popup.classList.add(e.popupIsOpened),document.addEventListener("keydown",this.closeByEscape)}closeByEscape=e=>{"Escape"===e.code&&this.close(this.popup)}}const r=(t,o="Сохранить",r="Сохранение")=>{const a=document.querySelector(`.${e.popupIsOpened}`),s=a.querySelector(`.${e.spinner}`),i=a.querySelector(`.${e.buttonTitle}`);a&&(t?(s.style.visibility="visible",i.textContent=r):(s.style.visibility="hidden",i.textContent=o))},a=(e,t)=>{const o=t._id;return document.allCards.find((t=>t._id===e._id)).likes.map((e=>e._id)).includes(o)},s="https://mesto.nomoreparties.co/v1/wff-cohort-26/",i={authorization:"dd7909e1-a3fd-46ba-9ec0-e41a2c933ce4"};class n{getProfileData(){return fetch(`${s}users/me`,{headers:i}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status} ${e.statusText}`)))}updateProfileData(e){return fetch(`${s}users/me`,{headers:{...i,"Content-Type":"application/json; charset=utf-8"},method:"PATCH",body:JSON.stringify(e)}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status} ${e.statusText}`)))}updateAvatar(e){return fetch(`${s}users/me/avatar`,{headers:{...i,"Content-Type":"application/json; charset=utf-8"},method:"PATCH",body:JSON.stringify({avatar:e})}).then((e=>e.ok?e.json():Promise.reject(`Ошибка обновления изображения: ${e.status} ${e.statusText}`)))}}const l=Object.freeze({formName:"edit-profile",currentProfileName:"profile__title",currentProfileJob:"profile__description",profileAvatar:"profile__image"});class c{getInitialCards(){return fetch(`${s}cards`,{headers:i}).then((e=>e.ok?e.json():Promise.reject(`Ошибка получения карточек: ${e.status} ${e.statusText}`)))}createCard(e){return fetch(`${s}cards`,{headers:{...i,"Content-Type":"application/json; charset=utf-8"},method:"POST",body:JSON.stringify(e)}).then((e=>e.ok?e.json():Promise.reject(`Ошибка при добавлении новой карточки: ${e.status} ${e.statusText}`)))}deleteCard(e){return fetch(`${s}cards/${e._id}`,{headers:i,method:"DELETE"}).then((e=>e.ok?e.json():Promise.reject(`Ошибка при удалении карточки: ${e.status} ${e.statusText}`)))}toggleLike(e,t){return t?fetch(`${s}cards/likes/${e}`,{headers:i,method:"DELETE"}).then((e=>e.ok?e.json():Promise.reject(`Ошибка доавления лайка: ${e.status} ${e.statusText}`))):fetch(`${s}cards/likes/${e}`,{headers:i,method:"PUT"}).then((e=>e.ok?e.json():Promise.reject(`Ошибка удаления лайка: ${e.status} ${e.statusText}`)))}}const p=Object.freeze({formName:"new-place",cardsContainer:"places__list"}),u=Object.freeze({popupImage:"popup__image",popupCaption:"popup__caption"});class d{preparePopupBeforeOpening(t,o){const r=t.querySelector(`.${e.cardImage}`),a=t.querySelector(`.${e.cardTitle}`);this.setPopupData({src:r.src,alt:r.alt,caption:a.textContent},o)}setPopupData(e,o){const r=document.querySelector(`.${t}`),a=r.querySelector(`.${u.popupImage}`),s=r.querySelector(`.${u.popupCaption}`);a.src=e.src,a.alt=e.alt||e.caption,s.textContent=e.caption,o()}}const m=Object.freeze({formName:"avatar",newAvatarLink:"profile__title",profileAvatar:"profile__image"}),h=new class{create=(e,t,o,r,a)=>{document.allCards.push(e);const s=this.getNewCardElement(e);return t=t||document.profileData,this.isCardOwner(e,t)&&this.addDeletionCardAction(s,e,r),this.addLikeAction(s,e,t,a),s.addEventListener("click",(e=>{e.stopPropagation(),o(s)})),s};isCardOwner(e,t){return e.owner._id===t._id}getNewCardElement(t){const o=document.querySelector("#card-template").content.querySelector(`.${e.cardItem}`).cloneNode(!0),r=o.querySelector(`.${e.cardImage}`);return r.src=new URL(t.link),r.alt=t.name,o.querySelector(`.${e.cardTitle}`).textContent=t.name,o.querySelector(`.${e.likesQuantity}`).textContent=t.likes.length,o}addDeletionCardAction(t,o,r){const a=t.querySelector(`.${e.deleteCardButton}`);a.addEventListener("click",(e=>(e.preventDefault(),e.stopPropagation(),r(t,o)))),a.classList.add(e.deleteCardButtonVisible)}addLikeAction(t,o,r,s){const i=!r,n=t.querySelector(`.${e.likeButton}`);n.addEventListener("click",(e=>{e.stopPropagation(),s(o,r,n,t)})),!i&&a(o,r)&&n.classList.add(e.likeActive)}},f=new class{cardRequests;showFullSizeImageInstance=new d;fullSIzeImgPopup=new o(t);constructor(){this.cardRequests=new c}getDeleteConfirmation=(e,t)=>{new o("popup_type_confirm",void 0,(()=>this.deleteCard(e,t))).open()};deleteCard=(e,t)=>(r(!0,"Да","Удаление"),this.cardRequests.deleteCard(t).then((()=>{e.remove()})).catch((e=>console.error(e))).finally((()=>r(!1))));toggleLike=(t,o,r,s)=>{const i=t._id,n=a(t,o);this.cardRequests.toggleLike(i,n).then((t=>{document.allCards=[...document.allCards.filter((e=>e._id!==i)),t],this.setLikesQuantity(s,t.likes.length),r.classList.toggle(e.likeActive)})).catch((e=>console.error(e)))};setLikesQuantity(t,o){t.querySelector(`.${e.likesQuantity}`).textContent=o}cardClick=e=>{this.showFullSizeImageInstance.preparePopupBeforeOpening(e,(()=>this.fullSIzeImgPopup.open()))}},g=new class{card=void 0;cardActions=void 0;constructor(e,t){this.card=e,this.cardActions=t}formElement=document.forms[p.formName];submitButton=this.formElement.querySelector(`.${e.submitButton}`);cardList=document.querySelector(`.${p.cardsContainer}`);preparePopupBeforeOpening(){this.formElement.reset()}getFormData(){const e=this.formElement.elements["place-name"],t=this.formElement.elements.link;return{name:e.value,link:t.value}}addNewCardPopupSubmit=()=>{r(!0);const e=this.getFormData();return(new c).createCard(e).then((e=>{const t=this.card.create(e,null,this.cardActions.cardClick,this.cardActions.getDeleteConfirmation,this.cardActions.toggleLike);this.addNewCardToCardContainer(t)})).catch((e=>console.error(e))).finally((()=>{r(!1)}))};addNewCardToCardContainer(e){this.cardList.prepend(e)}}(h,f),y=new class{profileRequests=new n;preparePopupBeforeOpening(){const e=this.getProfileData();this.setFormData(e)}getFormData(){const e=document.forms[l.formName],t=e.elements.name,o=e.elements.description;return{name:t.value,about:o.value}}setNewProfileDataSubmit=()=>{r(!0);const e=this.getFormData();return this.profileRequests.updateProfileData(e).then((e=>{this.setProfileData(e)})).catch((e=>{console.error(e)})).finally((()=>{r(!1)}))};setFormData(e){const t=document.forms[l.formName],o=t.elements.name,r=t.elements.description;o.value=e.name,r.value=e.about}getProfileData(){const e=document.querySelector(`.${l.currentProfileName}`),t=document.querySelector(`.${l.currentProfileJob}`);return{name:e.textContent||"",about:t.textContent||""}}setProfileData(e){const t=document.querySelector(`.${l.currentProfileName}`),o=document.querySelector(`.${l.currentProfileJob}`);t.textContent=e.name,o.textContent=e.about}},_=new class{profileRequests=new n;formElement=document.forms[m.formName];preparePopupBeforeOpening(){this.formElement.reset()}getFormData=()=>this.formElement.elements.link.value;updateAvatarSubmit=()=>{r(!0);const e=this.getFormData();return this.profileRequests.updateAvatar(e).then((e=>{this.setProfileAvatar(e.avatar)})).catch((e=>{console.error(e)})).finally((()=>{r(!1)}))};setProfileAvatar(e){document.querySelector(`.${m.profileAvatar}`).style.backgroundImage=`url(${e})`}},v=new o("popup_type_edit",y.setNewProfileDataSubmit),C=new o("popup_type_new-card",g.addNewCardPopupSubmit),b=new o("popup_type_update-avatar",_.updateAvatarSubmit),S=new class{config;constructor(e){this.config=e}enableValidation(){Array.from(document.querySelectorAll(this.config.formSelector)).forEach((e=>{this.setEventListenersForFormFields(e)}))}clearValidation(e){Array.from(e.querySelectorAll(this.config.inputSelector)).forEach((e=>{this.toggleErrorVisibility(!0,e)}))}setEventListenersForFormFields(e){const t=Array.from(e.querySelectorAll(this.config.inputSelector)),o=this.getSubmitElement(e);t.forEach((e=>{e.addEventListener("input",(()=>{this.checkFieldValidity(e);const r=t.every((e=>e.validity.valid));this.toggleButtonState(r,o)}))}))}checkFieldValidity(e){e.validity.valid?this.toggleErrorVisibility(!0,e):(e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),this.toggleErrorVisibility(!1,e,e.validationMessage))}toggleErrorVisibility(e,t,o){const r=t.nextElementSibling;e?(r.classList.remove(this.config.errorClass),r.textContent=""):(r.classList.add(this.config.errorClass),r.textContent=o)}toggleButtonState(e,t){e?(t.classList.remove(this.config.inactiveButtonClass),t.disabled=!1):(t.classList.add(this.config.inactiveButtonClass),t.disabled=!0)}getSubmitElement(e){return e.querySelector(this.config.submitButtonSelector)}cleanForm(e){this.clearValidation(e);const t=this.getSubmitElement(e);this.toggleButtonState(!1,t)}}({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"});document.allCards=[],Promise.all([(new c).getInitialCards(),(new n).getProfileData()]).then((([e,t])=>{document.profileData=t,e.forEach((e=>{const o=h.create(e,t,f.cardClick,f.getDeleteConfirmation,f.toggleLike);g.addNewCardToCardContainer(o)})),y.setProfileData(t),_.setProfileAvatar(t.avatar)})).catch((e=>console.error(e))),document.querySelector(`.${e.editProfileButton}`).addEventListener("click",(()=>P(y,v))),document.querySelector(`.${e.addNewCardButton}`).addEventListener("click",(()=>P(g,C))),document.querySelector(`.${e.profileAvatar}`).addEventListener("click",(()=>P(_,b)));const P=(t,o)=>{t.preparePopupBeforeOpening();const r=o.popup.querySelector(`.${e.form}`);S.cleanForm(r),o.open()};S.enableValidation()})();