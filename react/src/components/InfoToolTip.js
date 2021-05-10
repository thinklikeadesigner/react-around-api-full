import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { PopupWithImage } from "./PopupWithImage";

export function InfoToolTip(props) {
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.isOpen ? "modal_open" : ""
      }`}
    >
      <div className='modal__container'>
        <div className='infotooltip__container'>
          <div
            className={
              props.isItSuccess
                ? "info-tool-tip-success"
                : "info-tool-tip-failure"
            }
          ></div>
          <h1 className='infotooltip__message'>
            {props.isItSuccess
              ? "Success! You have now been registered."
              : "Oops, something went wrong! Please try again."}
          </h1>
        </div>
        <button
          aria-label='Close Button'
          type='reset'
          className={`modal__close-button modal__close-button_${props.name}`}
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;
