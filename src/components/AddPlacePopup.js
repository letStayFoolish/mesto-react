import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({ name, link });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='item'
      title='Новое место'
      buttonText='Сохранить'
      formName='place-form'
      onSubmit={handleSubmit}
    >
      children=
      {
        <>
          <label className='form__field form__field_row_first'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={link}
              onChange={(e) => setLink(e.target.value)}
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
  );
};

export default AddPlacePopup;
