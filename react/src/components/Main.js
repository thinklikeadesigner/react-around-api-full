import React from "react";
import Card from "../components/Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Footer } from "./Footer";
import { useHistory, Link } from "react-router-dom";
import { Header } from "./Header";

export function Main({
  onCardClick,
  onAddPlace,
  onEditProfile,
  onEditAvatar,
  cards,
  onCardLike,
  onCardDelete,
  onSignOut,
  userData,
  loggedIn,
}) {


console.log(cards[0]);
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header headerlogout='header__container_log-out'>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>{userData.email}</p>

          <Link
            style={{
              textDecoration: "none",
              color: "#A9A9A9",
              paddingLeft: 24,
            }}
            onClick={onSignOut}
            to='/login'
          >
            Log Out
          </Link>
        </div>
      </Header>
      <main className='container'>
        <section className='profile'>
          <div className='profile__container'>
            <div className='profile__info'>
              <div className='profile__avatar-btn' onClick={onEditAvatar}>
                <img
                  src={currentUser.avatar}
                  className='profile__pic'
                  alt={"avatar"}
                />
              </div>
              <div className='profile__text'>
                <h1 className='profile__name'>{currentUser.name}</h1>
                <button
                  type='button'
                  aria-label='Profile Edit Button'
                  className='form_button profile__edit-btn'
                  onClick={onEditProfile}
                ></button>
                <p className='profile__job'>{currentUser.about}</p>
              </div>
            </div>
            <button
              type='button'
              aria-label='Card Add Button'
              id='addButton'
              className='form_button profile__add-btn'
              onClick={onAddPlace}
            ></button>
          </div>
        </section>
        <section className='cards'>
          <ul className='cards__list'>
            {cards.map((card) => (
              <Card
          
                key={card._id}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                onCardClick={onCardClick}
                card={card}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
