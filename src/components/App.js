import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {
  // React Hooks - States
  // State to help us with opening/closing popup for profile editing:
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  // State to help us with opening/closing popup for adding new place:
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  // State to help us with opening/closing popup for change profile image:
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  // State to help us with open full-screen image on-click, depending what card is selected:
  const [selectedCard, setSelectedCard] = React.useState(null);
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
    <div className='page'>
      <div className='wrapper'>
        <Header />
        <Main
          onCardClick={setSelectedCard}
          onEditProfile={handleEditProfilePopupOpen}
          onAddPlace={handleAddPlacePopupOpen}
          onEditAvatar={handleEditAvatarPopupOpen}
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
  );
}

export default App;
