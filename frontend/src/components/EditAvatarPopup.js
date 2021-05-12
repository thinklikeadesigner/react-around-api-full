import React from "react";
import { PopupWithForm } from "./index";

export function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      name='avatar'
      formname='formAvatar'
      title='Avatar'
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        id='avatar-input'
        type='url'
        name='avatar'
        className='form__input form__input_type_url form__input_type_avatar'
        placeholder='Image URL'
        required
        ref={avatarRef}
      />

      <span className='form__input-error' id='avatar-input-error'></span>
    </PopupWithForm>
  );
}
