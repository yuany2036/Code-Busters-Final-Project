import React, { useContext, useState } from 'react';
import styles from '../card/Card.module.scss';
import { Icon } from '@iconify/react';
import { DataContext } from '../../data/context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TvShowCard = ({ id, title, posterPath }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  const { isUserLoggedIn } = useContext(DataContext);
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const addItemToCollection = async () => {
    try {
      const response = await axios.post('/tvshows/user', {
        title,
        posterPath,
        id,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const changeIcon = () => {
    setAdded((previous) => !previous);
  };

  const handleCardClick = () => {
    if (!isUserLoggedIn) {
      navigate('/login');
    } else {
      addItemToCollection();
    }
    changeIcon();
  };

  const handleDetailsClick = () => {
    navigate(`/title/tvshows/${id}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_poster}>
        <img src={posterUrl} alt={title} />
      </div>
      <div className={styles.card_details}>
        <h2 className={styles.card_title}>{title}</h2>
      </div>
      <div className={styles.btn}>
        <Icon
          icon="gg:details-more"
          color="whitesmoke"
          className={styles.outline}
          onClick={handleDetailsClick}
          style={{ fontSize: '35px' }}
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
            fontSize: '30px',
            color: `${added ? 'rgb(160, 123, 223)' : 'whitesmoke'}`,
          }}
        />{' '}
      </div>{' '}
    </div>
  );
};

export default TvShowCard;
