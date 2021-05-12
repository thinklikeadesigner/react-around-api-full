import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import {
  AddPlacePopup,
  ProtectedRoute,
  EditAvatarPopup,
  EditProfilePopup,
  PopupWithForm,
  PopupWithImage,
  Main, 
  Footer,
} from "./index";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as api from "../utils/api";
import { Register } from "./Register";
import { LogIn } from "./LogIn";
import * as auth from "../utils/auth";
import InfoToolTip from "./InfoToolTip";
function App() {
  const history = useHistory();

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  function resetForm() {
    setEmail("");
    setPassword("");
    setMessage("");
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((res) => setCurrentUser(res))
      .then(closeAllPopups)
      .catch((err) => {
       console.log(err.message);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({ avatar })
      .then((res) => setCurrentUser(res))
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err.message);
       });
  }

  //NOTE card functions

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardLike(card) {

    //NOTE here it has to be card._id
    const isLiked = card.likes?.some((i) => i._id === currentUser.id);



    api
      .changeCardLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        console.log('newCASFUHIAUFHISAUDHFIASFHUKSDFKSAJDFKASJFHKASJDHFKSDJHFAKSDHJFKASJDHFLKASJFHSAard', newCard);
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err.message);
       });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const oldCards = [...cards];

        const filteredCards = oldCards.filter(
          (oldCard) => oldCard._id !== card._id
        );
        setCards(filteredCards);
      })
      .catch((err) => {
        console.log(err.message);
       });
  }

  function handleUpdateCard(card) {
    api
      .addCard(card)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(closeAllPopups)
      .catch((err) => {
        console.log(err.message);
       });
  }

  //NOTE sign up log in functions

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("400 - one or more of the fields were not provided");
      return;
    }
    auth
      .authorize(email, password)
      .then((res) => {
        if (!res) {
          setSuccess(false);
          handleInfoToolTip();
          setMessage("401 - the user with the specified email not found");
          res
            .status(401)
            .json({ message: "the user with the specified email not found" });
          throw new Error("email doesn't exist");
        }
        if (res) {
          setLoggedIn(true);
        }
      })
      .then(resetForm)
      .then(() => {
        history.push("/login");
      })
      .catch((err) => {
        console.log(err.message);
       });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!password || !email) {
      return;
    }
    auth
      .register(email, password)
      .then((res) => {
        if (!res || res.status === 400) {
          setMessage("400 - one of the fields was filled in incorrectly");
          setSuccess(false);
          handleInfoToolTip();
          res
            .status(400)
            .json({ message: "one or more of the fields were not provided" });
          throw new Error("Error!!");
        }
        setSuccess(true);

        handleInfoToolTip();
        return res;
      })
      .then(resetForm)
      .then(history.push("/login"))
      .catch((err) => {
        console.log(err.message);
      });
  };

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }
  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleInfoToolTip() {
    setIsInfoToolTipOpen(true);
  }

  function handleLogOut() {
    localStorage.removeItem("token");
    history.push("/login");
    setLoggedIn(false);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(false);
    setIsImagePopupOpen(false);
    setIsInfoToolTipOpen(false);
  }

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (token) {
      console.log('token', token);
      console.log('has token', token);
      auth
        .getContent(token)
        .then((res) => {
          if (!res) {
            setMessage("400 - one or more of the fields were not provided");
            return;
          }
          return setCurrentUser(res)
        })
        .then(setLoggedIn(true))
        .then(() => {
          history.push("/main");
        })
        .catch((err) => {
          console.log(err.message);
         });
    }
  }, [history, loggedIn]);



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) 
 { 
     api
      .getCardList()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err.message);
       });
    }
  }, [setCards]);



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/login");
    }
  }, [history]);

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            path='/main'
            loggedIn={loggedIn}
            cards={cards}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onDeleteCard={handleDeleteCardClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            onSignOut={handleLogOut}
          ></ProtectedRoute>
          <Route path='/register'>
            <Register
            message={message}
              onSetEmail={handleSetEmail}
              onSetPassword={handleSetPassword}
              onRegister={handleRegisterSubmit}
            />
          </Route>
          <Route path='/login'>
            <LogIn
              onSetEmail={handleSetEmail}
              message={message}
              onSetPassword={handleSetPassword}
              onLogin={handleLoginSubmit}
              onInfoToolTip={handleInfoToolTip}
            />
          </Route>
          <Route exact path='/'>
            {loggedIn ? <Redirect to='/main' /> : <Redirect to='/login' />}
          </Route>
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleUpdateCard}
        />
        <PopupWithForm
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          name='delete'
          title='Are you sure?'
        />
        <PopupWithImage
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          figimage={selectedCard.link}
          figcaption={selectedCard.name}
        />
        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          isItSuccess={isSuccess}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
