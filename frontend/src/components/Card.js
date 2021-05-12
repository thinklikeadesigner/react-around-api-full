import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);



  const isOwn = props.card.owner === currentUser._id;


  const cardDeleteButtonClassName = `card__delete-btn ${
    isOwn ? "card_show-delete-btn card_show-delete-btn" : "card__delete-btn"
  }`;



  
  const isLiked = props.card.likes?.some((i) => 
   i._id === currentUser.id
  );

  const cardLikeButtonClassName = `card__heart ${
    isLiked ? " card__heart_active" : "card__heart"
  }`;

  return (
    <li className={`card `}>
      <img
        src={props.card.link}
        className='card__pic'
        onClick={handleClick}
        alt={props.card.name}
      />
      <button
        aria-label='Delete Button'
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      ></button>
      <div className='card__text'>
        <h2 className='card__title'>{props.card.name}</h2>
        <div className='card__likes_container'>
          <button
            aria-label='Like Button'
            onClick={handleLikeClick}
            className={`${cardLikeButtonClassName}`}
          ></button>
          <p className='card__likes_count'>{
           props.card.likes?.length
          
          }</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
