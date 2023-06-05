import React, { useState, useEfect, useContext } from 'react';
import Card from './Card';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

// Creating Main component and all its props
// Main component includes sections: edit profile; add new place; change profile image (avatar).
// Also in Main component we do request/response to API, about profile information and card information as well.
export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  // State to set default card array as an empty array:
  const [cards, setCards] = useState([]);
  // Putting API's request/response into a constants:
  const getCardsFromApi = api.getInitialCards();
  const userInformation = useContext(CurrentUserContext);
  // React Hook - state Effect, using this state, firstly we:
  // 1. Fetching card data, all at once,
  // 2. Once we got response from API, we are setting card information (name, link, id, ...)
  // As a second argument of useEffect State, we set an empty array '[]', so this shall be called only once as we got in or refresh the page.
  React.useEffect(() => {
    getCardsFromApi
      .then((cardsInformation) => {
        setCards(cardsInformation);
      })
      .catch((error) => console.error(`Error while loading cards ${error}`));
  }, []);
  // JSX markup to be render on a page:
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
            />
            <img
              onClick={onEditAvatar}
              src={userInformation.avatar}
              alt='Профильный аватар.'
              className='profile__avatar'
            />
          </div>
          <div className='profile__user'>
            <div className='profile__edit'>
              <h1 className='profile__user-name'>{userInformation.name}</h1>
              <button
                onClick={onEditProfile}
                type='button'
                className='profile__edit-btn'
                aria-label='Кнопка редактирования профиля'
              ></button>
            </div>
            <p className='profile__user-occupation'>{userInformation.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type='button'
          className='profile__add-btn'
          aria-label='Кнопка добавления карточки'
        ></button>
      </section>
      <section className='places'>
        {cards.map((card) => {
          return <Card card={card} key={card._id} onCardClick={onCardClick} />;
        })}
      </section>
    </main>
  );
}
