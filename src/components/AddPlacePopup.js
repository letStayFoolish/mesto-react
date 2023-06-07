import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Child from './Child';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  // Hook to clear inputs fields on every single submit action while adding new card(place).
  useEffect(() => {
    setName('');
    setLink('');
  }, [onAddPlace]);

  // Handler action on submite
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({ name, link });
  }
  // Handler to set name based on input value
  const handleSetName = (e) => {
    setName(e.target.value);
  };

  // Handler to set photo link based on input value
  const handleSetLink = (e) => {
    setLink(e.target.value);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='item'
      title='Новое место'
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      formName='place-form'
      onSubmit={handleSubmit}
    >
      <>
        <Child
          labelClassName='form__field form__field_row_first'
          value={name}
          onChange={handleSetName}
          name='popup-image-name'
          id='image-name'
          type='text'
          placeholder='Название'
          className='popup__input popup__image-name form__input'
          minLength='2'
        />
        <Child
          labelClassName='form__field form__field_row_second'
          value={link}
          onChange={handleSetLink}
          name='popup-image-link'
          id='image-link'
          type='url'
          placeholder='Ссылка на картинку'
          className='popup__input popup__image-link form__input'
          minLength='2'
        />
      </>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
