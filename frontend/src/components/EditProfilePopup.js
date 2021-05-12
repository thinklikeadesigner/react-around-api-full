import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { PopupWithForm } from "./index";

export function EditProfilePopup(props) {
  const [nameInput, setNameInput] = React.useState("");
  const [descriptionInput, setDescriptionInput] = React.useState("");

  function handleChangeNameInput(e) {
    setNameInput(e.target.value);
  }
  function handleChangeDescriptionInput(e) {
    setDescriptionInput(e.target.value);
  }
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setNameInput(currentUser.name || "");
    setDescriptionInput(currentUser.about || "");
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: nameInput,
      about: descriptionInput,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name='edit'
      formname='formEdit'
      title='Edit Profile'
    >
      <input
        id='name-input'
        minLength='2'
        maxLength='40'
        name='name'
        type='text'
        className='form__input form__input_type_name'
        placeholder='Name'
        required
        value={nameInput}
        onChange={handleChangeNameInput}
      />
      <span className='form__input-error' id='name-input-error'></span>
      <input
        id='job-input'
        minLength='2'
        maxLength='200'
        type='text'
        name='about'
        className='form__input form__input_type_job'
        placeholder='About Me'
        required
        value={descriptionInput}
        onChange={handleChangeDescriptionInput}
      />
      <span className='form__input-error' id='job-input-error'></span>
    </PopupWithForm>
  );
}
