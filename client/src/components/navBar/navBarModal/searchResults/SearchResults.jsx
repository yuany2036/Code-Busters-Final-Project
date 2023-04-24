import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SearchResults.module.scss';

const SearchResults = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Movies');

  const categories = [
    { category: 'Movies' },
    { category: 'TV Shows' },
    { category: 'Books' },
  ];

  useEffect(() => {
    (async () => {
      try {
        if (activeCategory === 'Movies') {
          const res = await axios.get(
            `http://localhost:4000/movies/?title=${searchTerm}`
          );
          setSearchResults(res.data);
        } else if (activeCategory === 'TV Shows') {
          const res = await axios.get(
            `http://localhost:4000/tvshows/?title=${searchTerm}`
          );
          setSearchResults(res.data);
        }
      } catch (err) {
        console.log(err.res);
      }
    })();
  }, [searchTerm, activeCategory]);

  return (
    <div>
      <div className={styles.buttons_container}>
        {categories.map(({ category }) => (
          <input
            className={`${styles.button} ${
              category === activeCategory ? styles.active : null
            }`}
            key={category}
            type="button"
            value={category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>
      {searchResults.map(({ title, poster_path, id }) => (
        <div key={id}>
          <h4>{title}</h4>
          <img
            src={`https://image.tmdb.org/t/p/w92${poster_path}`}
            alt="movie poster"
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
