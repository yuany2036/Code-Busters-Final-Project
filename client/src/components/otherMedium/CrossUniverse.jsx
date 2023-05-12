import React, { useEffect, useState } from 'react';
import MediumCard from './MediumCard';
import styles from './CrossUniverse.module.scss';

const CrossUniverse = ({ title, category, setRelatedTitles }) => {
  const [results, setResults] = useState([]);

  const apiKey = 'ad6c50ff4b12daee4d3c2b875c8684fc';

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (category !== 'books') {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=intitle:${title.title}`
          );
          const data = await response.json();
          if (data.totalItems === 0) return setRelatedTitles(false);
          setResults(
            data.items
              .map(({ id, volumeInfo: { title, imageLinks } }) => {
                return {
                  title,
                  imageLinks,
                  id,
                };
              })
              .slice(0, 3)
          );
          data.items.length === 0 && setRelatedTitles(false);
        } else {
          const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title.title}`;
          const response = await fetch(searchUrl);
          const data = await response.json();
          if (data.results.length === 0) return setRelatedTitles(false);
          setResults(data.results.slice(0, 3));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [category, title]);

  const isBook = category !== 'books';

  return (
    <div className={styles.medium_container}>
      <div className={styles.medium_container_left}>
        <h2 className={styles.medium_container_left_title}>How about..</h2>
        <div className={styles.medium_container_left_text}>
          <p>expanding your circle of interest?</p>
          <p> maybe even cross to the other side of the universe ... </p>
        </div>
        <div className={styles.arrow}></div>
      </div>
      <div className={styles.medium_container_right}>
        {results.map((item) => (
          <MediumCard
            key={item.id}
            {...(isBook ? { book: item } : { movie: item })}
          />
        ))}
      </div>
    </div>
  );
};

export default CrossUniverse;
