import React, { useContext, useState, useEffect } from 'react';
import styles from '../card/Card.module.scss';
import { Icon } from '@iconify/react';
import { DataContext } from '../../data/context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TvShowCard = ({ id, title, posterPath, styleClass, onTvShowRemoved }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  const { isUserLoggedIn, heartButtonNotification } = useContext(DataContext);
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const checkIfTvShowInCollection = async () => {
    if (isUserLoggedIn) {
      try {
        const response = await axios.get('/tvshows/user');
        const userTvShows = response.data.tvShows;
        const isTvShowInCollection = userTvShows.some(
          (tvShow) => tvShow.id === id
        );
        setAdded(isTvShowInCollection);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    checkIfTvShowInCollection();
  }, [isUserLoggedIn, id]);

  const addItemToCollection = async () => {
    try {
      const response = await axios.post('/tvshows/user', {
        title,
        posterPath,
        id,
      });
      heartButtonNotification(title, 'added to');
    } catch (error) {
      console.error(error);
    }
  };

  const removeItemFromCollection = async () => {
    try {
      const response = await axios.delete('/tvshows/user', {
        data: { tvId: id },
      });
      heartButtonNotification(title, 'removed from');
      if (onTvShowRemoved) {
        onTvShowRemoved();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const maxChars = 20; // maximum number of characters to display

  const truncatedName =
    title.length > maxChars ? title.slice(0, maxChars - 3) + '...' : title;

  const changeIcon = () => {
    setAdded((previous) => !previous);
  };

  const handleCardClick = () => {
    if (!isUserLoggedIn) {
      navigate('/login');
    } else {
      added ? removeItemFromCollection() : addItemToCollection();
    }
    changeIcon();
  };

  const handleDetailsClick = () => {
    navigate(`/title/tvshows/${id}`);
  };

  return (
    <div className={`${styles.card} ${styleClass}`}>
      <div className={styles.card_poster}>
        <img src={posterUrl} alt={title} />
      </div>
      <div className={styles.card_details}>
        <h2 className={styles.card_title}>{truncatedName}</h2>
      </div>
      <div className={styles.btn}>
        <Icon
          icon="gg:details-more"
          color="whitesmoke"
          className={styles.outline}
          onClick={handleDetailsClick}
          style={{ fontSize: '40px' }}
        />
        <Icon
          className={styles.fill}
          onClick={handleCardClick}
          icon={
            added
              ? 'material-symbols:heart-minus'
              : 'material-symbols:heart-plus-outline'
          }
          style={{
            fontSize: '35px',
            color: `${added ? 'rgb(160, 123, 223)' : 'whitesmoke'}`,
          }}
        />{' '}
      </div>{' '}
    </div>
  );
};

export default TvShowCard;
