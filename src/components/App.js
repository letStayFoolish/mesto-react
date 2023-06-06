import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmOnDelete from './ConfirmOnDelete';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {
  // React Hooks - States
  // State to help us with opening/closing popup for profile editing:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // State to help us with opening/closing popup for adding new place:
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  // State to help us with opening/closing popup for change profile image:
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // State to help us with opening/closing popup for change profile image:
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  // State to help us with open full-screen image on-click, depending what card is selected:
  const [selectedCard, setSelectedCard] = useState(null);
  // State to set default values for username, user occupation & user avatar(as a default there should not be an image):
  const [currentUser, setcurrentUser] = useState({
    name: 'Chili',
    about: 'Outdoorist | Traveler | Student',
    avatar: '',
  });
  // State to set default card array as an empty array:
  const [cards, setCards] = useState([]);
  // React Hook - state Effect, using this state, we do:
  // 1. Fetching card data, all at once,
  // 2. Once we got response from API, we are setting card information (name, link, id, ...)
  // As a second argument of useEffect State, we set an empty array '[]', so this shall be called only once as we got in or refresh the page.
  useEffect(() => {
    api
      .getInitialCards()
      .then((cardsInformation) => {
        setCards(cardsInformation);
      })
      .catch((error) =>
        console.error(`Error while requesting to GET cards from API: ${error}`)
      );
  }, []);
  // Function to add/remove card like, requesting and reciving respons from api:
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    isLiked
      ? api
          .removeLikes(card._id)
          .then((res) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? res : c))
            );
          })
          .catch((err) =>
            console.error(
              `Error while requesting to DELETE like on API: ${err}`
            )
          )
      : api
          .addLikes(card._id)
          .then((res) => {
            setCards((newCardsList) =>
              newCardsList.map((c) => (c._id === card._id ? res : c))
            );
          })
          .catch((err) =>
            console.error(
              `Error while requesting to PUT card like on API: ${err}`
            )
          );
  };

  // React Hook - state Effect, using this state we do:
  // 1. Fetching user data, all at once (name, about & avatar),
  // 2. Once we got response from API, we are setting profile information (name, about, avatar
  // As a second argument of useEffect State, we set an empty array '[]', so this shall be called only once as we got in or refresh the page.
  useEffect(() => {
    api
      .getUserInformation()
      .then((res) =>
        setcurrentUser({
          ...res,
          name: res.name,
          about: res.about,
          avatar: res.avatar,
        })
      )
      .catch((error) =>
        console.error(
          `Error while requesting to GET profile information from API: ${error}`
        )
      );
  }, []);
  // Handler-function to toggle true/false on popup for profile editing, so it opens or closes:
  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(
      (isEditProfilePopupOpen) => !isEditProfilePopupOpen
    );
  }
  // Handler-function to toggle true/false on popup to add new place, so it opens or closes:
  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen((isAddPlacePopupOpen) => !isAddPlacePopupOpen);
  }
  // Handler-function to toggle true/false on popup to change profile image, so it opens or closes:
  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen((isEditAvatarPopupOpen) => !isEditAvatarPopupOpen);
  }
  // Handler-function to toggle true/false on popup to confirm while deleting card, so it opens or closes:
  function handleConfirmationPopupOpen() {
    setIsConfirmationPopupOpen(
      (isConfirmationPopupOpen) => !isConfirmationPopupOpen
    );
  }
  // Function to close all popups on-click on close button
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsConfirmationPopupOpen(false);
  }
  // Function to remove card, requesting and receiving response from api
  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((newCardsList) =>
          newCardsList.filter((c) => c._id !== card._id)
        );
        closeAllPopups();
      })
      .catch((error) =>
        console.error(
          `Error while requesting to DELETE card from API: ${error}`
        )
      );
  };
  // Function to change profile name and description on submit
  function handleUpdateUser({ name, about }) {
    api
      .sendProfileInformation({
        name,
        about,
      })
      .then(
        () =>
          setcurrentUser((prevData) => {
            return { ...prevData, name, about };
          }),
        closeAllPopups()
      )
      .catch((error) =>
        console.error(
          `Error while requesting to PATCH new user info on API: ${error}`
        )
      );
  }
  // Function to update profile avatar
  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatarImage({ avatar })
      .then(
        () =>
          setcurrentUser((prevData) => {
            return { ...prevData, avatar };
          }),
        closeAllPopups()
      )
      .catch((error) =>
        console.error(
          `Error while requesting to PATCH new user avatar on API: ${error}`
        )
      );
  }
  // Function to add new place on submit
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => setCards([newCard, ...cards]), closeAllPopups())
      .catch((error) =>
        console.error(
          `Error while requesting to PUT new card(place) on API: ${error}`
        )
      );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='wrapper'>
          <Header />
          <Main
            onCardClick={setSelectedCard}
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPlacePopupOpen}
            onEditAvatar={handleEditAvatarPopupOpen}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ConfirmOnDelete
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            // onCardDelete={handleCardDelete}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
