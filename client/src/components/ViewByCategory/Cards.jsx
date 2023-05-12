import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Cards.module.scss';

const Cards = ({ titles, activeCategory }) => {
  const category_container = activeCategory.toLowerCase().split(' ').join('');

  return (
    <div className={`${styles.poster_container} ${styles[category_container]}`}>
      {titles.map(({ poster_path, title, name, id }) => {
        return (
          <div key={id} className={styles.title_box}>
            <Link
              to={`/title/${activeCategory
                .toLowerCase()
                .replace(' ', '')}/${id}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w185${poster_path}`}
                alt="movie poster"
              />
            </Link>
            {(title && <h4>{title}</h4>) || (name && <h4>{name}</h4>)}
          </div>
        );
      })}
    </div>
  );
};

export default Cards;

// "w92", "w154", "w185", "w342", "w500", "w780", or "original";
