import React, { useContext, useEffect, useState } from 'react';
import styles from '../card/Card.module.scss';
import { Icon } from '@iconify/react';
import { DataContext } from '../../data/context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieCard = ({ title, posterPath, id, styleClass, onMovieRemoved }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  const { isUserLoggedIn, moviesDispatch, heartButtonNotification } =
    useContext(DataContext);
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const checkIfMovieInCollection = async () => {
    if (isUserLoggedIn) {
      try {
        const response = await axios.get('/movies/user');
        const userMovies = response.data.movies;
        console.log(userMovies);
        const isMovieInCollection = userMovies.some((movie) => movie.id === id);
        setAdded(isMovieInCollection);
        console.log(isMovieInCollection);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    checkIfMovieInCollection();
  }, [isUserLoggedIn, id]);

  const addItemToCollection = async () => {
    try {
      const response = await axios.post('/movies/user', {
        title,
        posterPath,
        id,
      });
      console.log(response);
      heartButtonNotification(title, 'added');
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemFromCollection = async () => {
    try {
      const response = await axios.delete('/movies/user', {
        data: { movieId: id },
      });
      moviesDispatch({ type: 'UPDATE_MOVIES', payload: response.data.movies });
      heartButtonNotification(title, 'removed');
      if (onMovieRemoved) {
        onMovieRemoved();
      }
    } catch (error) {
      console.log(error);
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
    navigate(`/title/movies/${id}`);
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
          className={styles.outline}
          style={{ fontSize: '40px' }}
          icon="gg:details-more"
          color="whitesmoke"
          onClick={handleDetailsClick}
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
      </div>
    </div>
  );
};

export default MovieCard;
