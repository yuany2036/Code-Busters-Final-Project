import React, { useContext, useState } from 'react';
import styles from '../card/Card.module.scss';
import { DataContext } from '../../data/context';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Tooltip } from 'react-tooltip';
import axios from 'axios';

const BookCard = ({ id, authors, title, thumbnail }) => {
  const { isUserLoggedIn } = useContext(DataContext);
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const addItemToCollection = async () => {
    try {
      const response = await axios.post('/books/user', {
        authors,
        title,
        thumbnail,
        id,
      });
      console.log(response);
      console.log('addItemToCollection id:', id);
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

  return (
    <div className={styles.card}>
      <img className={styles.card_poster} src={thumbnail} alt={title} />
      <div className={styles.card_details}>
        <h2 className={styles.card_title}>{title}</h2>
        <p className={styles.author_p}>by {authors.join(', ')}</p>
      </div>

      <div className={styles.btn}>
        <Icon
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Discover more"
          className={styles.outline}
          icon="gg:details-more"
          color="#401d56"
          style={{ fontSize: '35px' }}
        />
        <Icon
          data-tooltip-id="my-tooltip"
          data-tooltip-content={
            added ? 'Remove from collection' : 'Add to collection'
          }
          
          className={styles.fill}
          onClick={handleCardClick}
          icon={
            added
              ? 'material-symbols:heart-minus'
              : 'material-symbols:heart-plus-outline'
          }
          color="white"
          style={{ fontSize: '35px' }}
        />{' '}
        <Tooltip id="my-tooltip"
        place='bottom'/>
      </div>
    </div>
  );
};

export default BookCard;
