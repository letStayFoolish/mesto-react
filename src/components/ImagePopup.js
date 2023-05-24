import React from 'react';

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_image ${card && 'popup_opened'}`}>
      <div className='popup__container'>
        <figure className='popup__image'>
          <button
            type='button'
            onClick={onClose}
            className='popup__close-btn popup__close-btn_type_image'
            arialabel='Кнопка закрития модального окна'
          ></button>
          <img alt={card.alt} className='popup__img' src={card.link} />
          <figcaption className='popup__heading'>{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
