import React from 'react';
import styles from './Cards.module.scss';

const Cards = ({ titles, activeCategory }) => {
  return (
    <div className={styles.poster_container}>
      {titles.map(({ poster_path, title }) => {
        return (
          <div key={title}>
            <img
              src={`https://image.tmdb.org/t/p/w92${poster_path}`}
              alt="movie poster"
            />
            {/* <h4>{title}</h4> */}
          </div>
        );
      })}
    </div>
  );
};

export default Cards;

// "w92", "w154", "w185", "w342", "w500", "w780", or "original";
