import React from 'react';
import styles from './MediumCard.module.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MediumCard = ({ movie, book }) => {
  const [bookCover, setBookCover] = useState('');
  const navigate = useNavigate();

  const backupCover =
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=185&q=80';

  useEffect(() => {
    if (book) {
      if (book.imageLinks) {
        const { small, medium, large, thumbnail, smallThumbnail } =
          book.imageLinks;
        const options =
          small ||
          medium ||
          large ||
          thumbnail ||
          smallThumbnail ||
          backupCover;
        setBookCover(options);
      } else setBookCover(backupCover);
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
      {/* <div className={styles.card_container_box}> */}
      <img className={styles.cover} src={imageUrl} alt={title} />
      <h4 className={styles.card_container_title}>{title ? title : 'Wait'}</h4>
    </div>
    // </div>
  );
};

export default MediumCard;
