import React, { useState, useEffect, useContext, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  let avatarRef = useRef('');
  // Function to update user name and user description on submit
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='avatar-image'
      title='Обновить аватар'
      buttonText='Сохранить'
      formName='avatar-form'
      onSubmit={handleSubmit}
    >
      children=
      {
        <label className='form__field form__field_row_second'>
          <input
            ref={avatarRef}
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
  );
};

export default EditAvatarPopup;
