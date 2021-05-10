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
import { api } from "../utils/api";
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

  const [userData, setUserData] = useState(false);
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
        console.log(
          `this is an error message for handleUpdateUserInfo in app.js ${err}`
        );
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar({ avatar })
      .then((res) => setCurrentUser(res))
      .then(closeAllPopups)
      .catch((err) => {
        console.log(`handleUpdateAvatar error message ${err}`);
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
    const isLiked = card.likes.some((i) => i._id === currentUser.id);



    api
      .changeCardLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        console.log('newCASFUHIAUFHISAUDHFIASFHUKSDFKSAJDFKASJFHKASJDHFKSDJHFAKSDHJFKASJDHFLKASJFHSAard', newCard);
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`handleCard like error message ${err}`);
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
        console.log(`handleCardDelete error message ${err}`);
      });
  }

  function handleUpdateCard(card) {
    api
      .addCard(card)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(closeAllPopups)
      .catch((err) => {
        console.log(`handleUpdateCard error message ${err}`);
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
      .then((data) => {
        if (!data) {
          setSuccess(false);
          handleInfoToolTip();
          setMessage("401 - the user with the specified email not found");
          data
            .status(401)
            .json({ message: "the user with the specified email not found" });
          throw new Error("email doesn't exist");
        }
        if (data) {
          setLoggedIn(true);
        }
      })
      .then(resetForm)
      .then(() => {
        history.push("/login");
      })
      .catch((err) => {
        console.log(err.message);
        console.log(message);
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
          return setUserData({
            email: res.email,
          });
        })
        .then(setLoggedIn(true))
        .then(() => {
          history.push("/main");
        })
        .catch((err) => {
          console.log(
            `this is an error message for handleUpdateUserInfo in app.js ${err}`
          );
        });
    }
  }, [history, loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
 if (token) {   api
  .getUserInfo(token)
  .then((res) => {
    console.log('useringo', res);
    setCurrentUser(res);
  })
  .catch((err) => {
    console.log(` useEffect getUserInfo error message  ${err}`);
  });}
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) 
 { 
     api
      .getCardList()
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => {
        console.log(`useEffect get card list error message ${err}`);
      });
    }
  }, []);



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
            userData={userData}
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
              onSetEmail={handleSetEmail}
              onSetPassword={handleSetPassword}
              onRegister={handleRegisterSubmit}
            />
          </Route>
          <Route path='/login'>
            <LogIn
              onSetEmail={handleSetEmail}
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
