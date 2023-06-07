import React, { forwardRef, createRef } from 'react';
import PopupWithForm from './PopupWithForm';
import Child from './Child';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const avatarRef = createRef('');
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
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      formName='avatar-form'
      onSubmit={handleSubmit}
    >
      <Child
        labelClassName='form__field form__field_row_second'
        ref={avatarRef}
        name='popup-avatar-image-link'
        id='avatar-image-link'
        type='url'
        placeholder='Ссылка на картинку'
        className='popup__input popup__avatar-image-link form__input'
      />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
