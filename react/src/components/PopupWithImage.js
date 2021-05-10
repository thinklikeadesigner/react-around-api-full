import React from "react";

export function PopupWithImage(props) {
  return (
    <div className={`modal modal_type_pic ${props.isOpen ? "modal_open" : ""}`}>
      <div className='modal__container'>
        <button
          aria-label='Close Button '
          type='button'
          className='modal__close-button modal__close-button_pic'
          onClick={props.onClose}
        ></button>
        <figure className='modal__figure'>
          <img
            src={props.figimage}
            className='modal__img'
            alt={props.figcaption}
          />
          <figcaption className='modal__caption'>{props.figcaption}</figcaption>
        </figure>
      </div>
    </div>
  );
}
