const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_visible",
};

const cardsConfig = {
  cardSelector: "#card__template",
  placesWrap: ".cards__list",
};

const addFormModalWindow = document.querySelector(".modal_type_add");
const avatarFormModalWindow = document.querySelector(".modal_type_avatar");
const editFormModalWindow = document.querySelector(".modal_type_edit");
const deleteFormModalWindow = document.querySelector(".modal_type_delete");
const picFormModalWindow = document.querySelector(".modal_type_pic");

const avatarModalButton = document.querySelector(".profile__pic");
const editModalButton = document.querySelector(".profile__edit-btn");
const inputJob = document.querySelector(".form__input_type_job");
const inputName = document.querySelector(".form__input_type_name");

const deleteSubmit = document.querySelector(".delete-submit");
const addSubmit = document.querySelector(".add-submit");
const editSubmit = document.querySelector(".edit-submit");
const avatarSubmit = document.querySelector(".avatar-submit");
const addModalButton = document.querySelector(".profile__add-btn");

const profileJob = document.querySelector(".profile__job");
const profileName = document.querySelector(".profile__name");
const profileAvatar = document.querySelector(".profile__pic");

export {
  picFormModalWindow,
  deleteFormModalWindow,
  addSubmit,
  editSubmit,
  avatarSubmit,
  addModalButton,
  avatarModalButton,
  editModalButton,
  cardsConfig,
  settings,
  inputJob,
  profileAvatar,
  inputName,
  profileName,
  profileJob,
  deleteSubmit,
  addFormModalWindow,
  editFormModalWindow,
  avatarFormModalWindow,
};
