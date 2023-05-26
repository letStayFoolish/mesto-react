import React from 'react';
// Creating global PopupWithForm components with all its props so every time we can create an unique popup by typing new: title, name, and so on...
// We are using isOpen conditional operator so we can add or remove additional class name to the popup, so it becomes visible or hidden.
export default function PopupWithForm({
  title,
  name,
  buttonText,
  formName,
  children,
  isOpen,
  onClose,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className='popup__container'>
        <div className='popup__body'>
          <button
            type='button'
            onClick={onClose}
            className={`popup__close-btn popup__close-btn_type_${name}`}
            aria-label='Кнопка закрития модального окна'
          ></button>
          <h2 className='popup__title'>{title}</h2>
          <form
            action='#'
            name={`${formName}`}
            className={`popup__form popup__form_type_${name} form`}
            noValidate
          >
            {children}
            <button
              className={`popup__button popup__button_type_${name}`}
              type='submit'
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
