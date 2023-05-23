import React from 'react';

export default function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
  return (
    <main className='main container'>
      <section className='profile'>
        <div className='profile__block'>
          <div className='profile__avatar-block'>
            <button
              onClick={onEditAvatar}
              type='button'
              className='profile__edit-avatar'
              aria-label='Кнопка редактирования изображения аватара.'
            ></button>
            <img
              src="<%=require('./images/profile-avatar.png')%>"
              alt='Профильный аватар.'
              className='profile__avatar'
            />
          </div>
          <div className='profile__user'>
            <div className='profile__edit'>
              <h1 className='profile__user-name'>Чили</h1>
              <button
                onClick={onEditProfile}
                type='button'
                className='profile__edit-btn'
                aria-label='Кнопка редактирования профиля'
              ></button>
            </div>
            <p className='profile__user-occupation'>Путешественик</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type='button'
          className='profile__add-btn'
          aria-label='Кнопка добавления карточки'
        ></button>
      </section>
      <section className='places'></section>
    </main>
  );
}
