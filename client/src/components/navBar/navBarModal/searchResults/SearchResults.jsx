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
        const res = await axios.get(
          `http://localhost:4000/${activeCategory
            .toLowerCase()
            .split(' ')
            .join('')}/?title=${searchTerm}`
        );
        setSearchResults(res.data);
      } catch (err) {
        console.log(err.res);
      }
    })();
  }, [searchTerm, activeCategory]);

  return (
    <div className={styles.search_results}>
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
      <div className={styles.results_container}>
        {(activeCategory === 'Movies' || activeCategory === 'TV Shows') &&
          searchResults.map(({ title, name, poster_path, id }) => (
            <div className={styles.results_card} key={id}>
              <h4>{title ? title : name}</h4>
              <img
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w342${poster_path}`
                    : 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80'
                }
                alt="movie poster"
                width="200px"
              />
            </div>
          ))}
        {searchTerm.trim().length === 0 && <h2>Start Typing to search</h2>}
      </div>
    </div>
  );
};

export default SearchResults;
