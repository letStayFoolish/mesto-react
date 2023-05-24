import React from 'react';

export default function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick({ name: card.name, alt: card.name, link: card.link });
  }
  return (
    <div className='card'>
      <img
        alt={card.name}
        className='card__image'
        src={card.link}
        onClick={handleCardClick}
      />
      <button
        type='button'
        className='card__remove-btn card__remove-btn_active'
        aria-label='Кнопка удаления карточки'
      ></button>
      <div className='card__info'>
        <h2 className='card__title text'>{card.name}</h2>
        <div className='card__likes'>
          <button
            type='button'
            className='card__like-btn'
            aria-label='Кнопка для добавления/удаления лайка'
          ></button>
          <div className='card__likes_count'>{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}
