import PopupWithForm from './PopupWithForm';
import InputWithAvatar from './InputWithAvatar';
import { useRef, useEffect } from 'react';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const ref = useRef(null);
  // Function to update user name and user description on submit
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value,
    });
  }
  useEffect(() => {
    ref.current.value = '';
  }, [onUpdateAvatar]);

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
      <InputWithAvatar
        labelClassName='form__field form__field_row_second'
        ref={ref}
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
