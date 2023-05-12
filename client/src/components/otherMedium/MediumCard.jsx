import React from 'react';
import styles from './MediumCard.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MediumCard = ({ movie, book }) => {
  const [bookCover, setBookCover] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (book) {
      if (book.imageLinks) {
        const { small, medium, large, thumbnail, smallThumbnail } =
          book.imageLinks;
        const options = small || medium || large || thumbnail || smallThumbnail;
        setBookCover(options);
      }
    }
  }, [movie, book]);

  const imageUrl = movie
    ? `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
    : bookCover;

  const title = movie ? movie.title : book.title;

  const id = movie ? movie.id : book.id;

  const handleClick = () => {
    if (!movie) {
      navigate(`/title/books/${id}`);
    } else {
      navigate(`/title/movies/${id}`);
    }
  };

  return (
    <div className={styles.card_container} onClick={handleClick}>
      <img src={imageUrl} alt={title} />
      <h4 className={styles.card_container_title}>{title ? title : 'Wait'}</h4>
    </div>
  );
};

export default MediumCard;
