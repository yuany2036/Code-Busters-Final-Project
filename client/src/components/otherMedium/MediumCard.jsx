import React from 'react';
import styles from './MediumCard.module.scss';
/* import { useNavigate } from 'react-router-dom'; */

const MediumCard = ({ movie, book }) => {
  /* const navigate = useNavigate(); */
  const imageUrl = movie
    ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
    : book.imageLinks?.thumbnail;

  const title = movie ? movie.title : book.title;

  /* const id = movie ? movie.id : book.id;

  const handleClick = () => {
    if (movie) {
      navigate(`/title/movies/${id}`);
    } else {
      navigate(`/title/books/${id}`);
    }
  }; */

  return (
    <div className={styles.card_container} /* onClick={handleClick} */>
      <img src={imageUrl} alt={title} />
      <h4 className={styles.card_container_title}>{title}</h4>
    </div>
  );
};


export default MediumCard;
