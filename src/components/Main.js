import React from 'react';
import Card from './Card';
import api from '../utils/api';
// Creating Main component and all its props
// Main component includes sections: edit profile; add new place; change profile image (avatar).
// Also in Main component we do request/response to API, about profile information and card information as well.
export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  // States within Main component: firstly we set default values for username, user occupation & user avatar(as a default there should not be an image):
  const [userName, setUserName] = React.useState('Чили');
  const [userDescription, setUserDescription] = React.useState('Путешественик');
  const [userAvatar, setUserAvatar] = React.useState('');
  // State to set default card array as an empty array:
  const [cards, setCards] = React.useState([]);
  // Putting API's request/response into a constants:
  const getUserInfoFromApi = api.getUserInformation();
  const getCardsFromApi = api.getInitialCards();
  // React Hook - state Effect, using this state, firstly we:
  // 1. Fetching profile and card data as well, all at once,
  // 2. Once we got response from API, we are setting profile information: username, user occupation, user avatar and card information (name, link, id, ...)
  // As a second argument of useEffect State, we set an empty array '[]', so this shall be called only once as we got in or refresh a page.
  React.useEffect(() => {
    Promise.all([getUserInfoFromApi, getCardsFromApi])
      .then(([userInformation, cardsInformation]) => {
        setUserName(userInformation.name);
        setUserDescription(userInformation.about);
        setUserAvatar(userInformation.avatar);
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
              src={userAvatar}
              alt='Профильный аватар.'
              className='profile__avatar'
            />
          </div>
          <div className='profile__user'>
            <div className='profile__edit'>
              <h1 className='profile__user-name'>{userName}</h1>
              <button
                onClick={onEditProfile}
                type='button'
                className='profile__edit-btn'
                aria-label='Кнопка редактирования профиля'
              ></button>
            </div>
            <p className='profile__user-occupation'>{userDescription}</p>
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
