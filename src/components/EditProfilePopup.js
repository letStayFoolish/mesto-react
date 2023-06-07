import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Child from './Child';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
  // Function to update user name and user description on submit
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  // Handler to set user name based on input value
  const handleSetName = (e) => {
    setName(e.target.value);
  };

  // Handler to set user description based on input value
  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='user'
      title='Редактировать профил'
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      formName='profile-form'
      onSubmit={handleSubmit}
    >
      <>
        <Child
          labelClassName='form__field form__field_row_first'
          value={name}
          onChange={handleSetName}
          name='popup-username'
          id='username'
          type='text'
          placeholder='name'
          className='popup__input popup__user-name form__input'
          minLength='2'
          maxLength='40'
        />
        <Child
          labelClassName='form__field form__field_row_second'
          value={description}
          onChange={handleSetDescription}
          name='popup-occupation'
          id='occupation'
          type='text'
          placeholder='occupation'
          className='popup__input popup__occupation form__input'
          minLength='2'
          maxLength='2000'
        />
      </>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
