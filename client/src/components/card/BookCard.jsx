import React, { useContext } from 'react';
import styles from '../card/Card.module.scss';
import { DataContext } from '../../data/context';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from 'axios';

const BookCard = ({ id, authors, title, thumbnail }) => {

  const { isUserLoggedIn } = useContext(DataContext);
  const navigate = useNavigate();

  const addItemToCollection = async () => {
    try {
      const response = await axios.post("/books/user", { authors, title, thumbnail, id });
      console.log(response);
      console.log('addItemToCollection id:', id);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCardClick = () => {
    if (!isUserLoggedIn) {
      navigate('/login');
    }
    else { addItemToCollection(); }
  }

  return (
    <div className={styles.card}>
      <img className={styles.card_poster} src={thumbnail} alt={title} />
      <div className={styles.card_details}>
        <h2 className={styles.card_title}>{title}</h2>
        <p className={styles.author_p}>by {authors.join(', ')}</p>
      </div>

      <div className={styles.btn}>
        <button className={styles.outline}>
          <Icon icon="gg:details-more" color="#401d56" />
        </button>
        <button className={styles.fill} onClick={handleCardClick}>
          <Icon icon="material-symbols:heart-plus-outline" color="white" />{' '}
        </button>
      </div>
    </div>
  );
};

export default BookCard;