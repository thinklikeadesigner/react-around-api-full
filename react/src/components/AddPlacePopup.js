import React from "react";
import {PopupWithForm} from "./index";

export function AddPlacePopup(props) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }
  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateCard({
      name: placeName,
      link: placeLink,
    });
    setPlaceLink('');
    setPlaceName('');


  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="add"
      formname="formAdd"
      title="New Place"
    >
      <input
        id="title-input"
        minLength="2"
        maxLength="30"
        name="name"
        type="text"
        className="form__input form__input_type_title"
        placeholder="Title"
        required
        value={placeName}

        onChange={handleChangePlaceName}
      />
      <span className="form__input-error" id="title-input-error"></span>
      
      <input
        id="url-input"
        type="url"
        name="link"
        className="form__input form__input_type_url"
        placeholder="Image URL"
        required
        onChange={handleChangePlaceLink}
        value={placeLink}
      />
      <span className="form__input-error" id="url-input-error"></span>
    </PopupWithForm>
  );
}


