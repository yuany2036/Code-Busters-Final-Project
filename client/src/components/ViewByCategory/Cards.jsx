import React from 'react';
import styles from './Cards.module.scss';

const Cards = ({ titles }) => {
  return (
    <div className={styles.poster_container}>
      {titles.map(({ poster_path, title }) => {
        return (
          <React.Fragment key={title}>
            <img
              src={`https://image.tmdb.org/t/p/w92${poster_path}`}
              alt="movie poster"
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Cards;

// "w92", "w154", "w185", "w342", "w500", "w780", or "original";
