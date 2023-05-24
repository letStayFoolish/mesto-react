import React from 'react';
import Card from './Card';
import api from '../utils/api';

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [userName, setUserName] = React.useState('Чили');
  const [userDescription, setUserDescription] = React.useState('Путешественик');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const getUserInfoFromApi = api.getUserInformation();
  const getCardsFromApi = api.getInitialCards();

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
              // style={{ backgroundImage: `url(${userAvatar})` }}
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
