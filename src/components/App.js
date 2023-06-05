import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
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
  // React Hook - state Effect, using this state, firstly we:
  // 1. Fetching card data, all at once,
  // 2. Once we got response from API, we are setting card information (name, link, id, ...)
  // As a second argument of useEffect State, we set an empty array '[]', so this shall be called only once as we got in or refresh the page.
  useEffect(() => {
    api
      .getInitialCards()
      .then((cardsInformation) => {
        setCards(cardsInformation);
      })
      .catch((error) => console.error(`Error while loading cards ${error}`));
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
          .catch((err) => console.error(`Error on loading ${err}`))
      : api
          .addLikes(card._id)
          .then((res) => {
            setCards((newCardsList) =>
              newCardsList.map((c) => (c._id === card._id ? res : c))
            );
          })
          .catch((err) => console.error(`Error on loading ${err}`));
  };
  // Function to remove card, requesting and receiving response from api
  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((newCardsList) =>
          newCardsList.filter((c) => c._id !== card._id)
        );
      })
      .catch((error) => console.error(`Error while deleting cards ${error}`));
  };
  // React Hook - state Effect, using this state we:
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
        console.error(`Error while loading profile information ${error}`)
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
  // Function to close all popups on-click on close button
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
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
          <PopupWithForm
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            name='user'
            title='Редактировать профил'
            buttonText='Сохранить'
            formName='profile-form'
          >
            children=
            {
              <>
                <label className='form__field form__field_row_first'>
                  <input
                    name='popup-username'
                    id='username'
                    type='text'
                    placeholder='name'
                    className='popup__input popup__user-name form__input'
                    minLength='2'
                    maxLength='40'
                    required
                  />
                  <span className='popup__input-error popup__input-error_type_username'>
                    Необходимо заполнить данное поле
                  </span>
                </label>
                <label className='form__field form__field_row_second'>
                  <input
                    name='popup-occupation'
                    id='occupation'
                    type='text'
                    placeholder='occupation'
                    className='popup__input popup__occupation form__input'
                    minLength='2'
                    maxLength='200'
                    required
                  />
                  <span className='popup__input-error popup__input-error_type_occupation'>
                    Необходимо заполнить данное поле
                  </span>
                </label>
              </>
            }
          </PopupWithForm>
          <PopupWithForm
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            name='item'
            title='Новое место'
            buttonText='Сохранить'
            formName='place-form'
          >
            children=
            {
              <>
                <label className='form__field form__field_row_first'>
                  <input
                    name='popup-image-name'
                    id='image-name'
                    type='text'
                    placeholder='Название'
                    className='popup__input popup__image-name form__input'
                    minLength='2'
                    maxLength='30'
                    required
                  />
                  <span className='popup__input-error popup__input-error_type_image-name'>
                    Необходимо заполнить данное поле
                  </span>
                </label>
                <label className='form__field form__field_row_second'>
                  <input
                    name='popup-image-link'
                    id='image-link'
                    type='url'
                    placeholder='Ссылка на картинку'
                    className='popup__input popup__image-link form__input'
                    required
                  />
                  <span className='popup__input-error popup__input-error_type_image-link'>
                    Необходимо заполнить данное поле
                  </span>
                </label>
              </>
            }
          </PopupWithForm>
          <PopupWithForm
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            name='avatar-image'
            title='Обновить аватар'
            buttonText='Сохранить'
            formName='avatar-form'
          >
            children=
            {
              <label className='form__field form__field_row_second'>
                <input
                  name='popup-avatar-image-link'
                  id='avatar-image-link'
                  type='url'
                  placeholder='Ссылка на картинку'
                  className='popup__input popup__avatar-image-link form__input'
                  required
                />
                <span className='popup__input-error popup__input-error_type_avatar-image-link'>
                  Необходимо заполнить данное поле
                </span>
              </label>
            }
          </PopupWithForm>
          <PopupWithForm
            name='areyousure'
            title='Вы уверены?'
            buttonText='Да'
            formName='cofirmation-form'
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
