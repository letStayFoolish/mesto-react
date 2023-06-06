import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='user'
      title='Редактировать профил'
      buttonText='Сохранить'
      formName='profile-form'
      onSubmit={handleSubmit}
    >
      children=
      {
        <>
          <label className='form__field form__field_row_first'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
  );
};

export default EditProfilePopup;
