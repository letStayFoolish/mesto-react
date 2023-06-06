import React from 'react';
import PopupWithForm from './PopupWithForm';

const ConfirmOnDelete = ({ isOpen, onClose, onCardDelete, card }) => {
  // Function to confirm deleting card on submit
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name='areyousure'
      title='Вы уверены?'
      buttonText='Да'
      formName='cofirmation-form'
      onSubmit={handleSubmit}
    />
  );
};

export default ConfirmOnDelete;
