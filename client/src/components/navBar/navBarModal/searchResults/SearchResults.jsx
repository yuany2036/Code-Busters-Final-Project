import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './SearchResults.module.scss';

const SearchResults = ({ searchTerm, closeModal }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Movies');
  const [loading, setLoading] = useState(false);

  const categories = [
    { category: 'Movies' },
    { category: 'TV Shows' },
    { category: 'Books' },
  ];

  const activeCategoryJoined = activeCategory.toLowerCase().replace(' ', '');

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/${activeCategoryJoined}/?title=${searchTerm}`
        );
        setSearchResults(res.data);
      } catch (err) {
        console.log(err.res);
      } finally {
        setLoading(false);
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
        {loading && <h3>Loading...</h3>}
        {searchResults.length === 0 && !loading && (
          <h2>No results found for this category</h2>
        )}
        {(activeCategory === 'Movies' || activeCategory === 'TV Shows') &&
          !loading &&
          searchResults.length > 0 &&
          searchResults.map(({ title, name, poster_path, id }) => (
            <div className={styles.results_card} key={id}>
              <Link to={`/title/${activeCategoryJoined}/${id}`}>
                <img
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w342${poster_path}`
                      : 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80'
                  }
                  alt="movie poster"
                  width="200px"
                  onClick={() => closeModal()}
                />
              </Link>
              <h4>{title ? title : name}</h4>
            </div>
          ))}
        {activeCategory === 'Books' &&
          !loading &&
          searchResults.length === 10 &&
          searchResults.map(
            ({ volumeInfo: { title, imageLinks: { thumbnail } = {} }, id }) => {
              console.log();

              return (
                <div className={styles.results_card} key={id}>
                  <Link to={`/title/${activeCategoryJoined}/${id}`}>
                    <img
                      src={
                        thumbnail
                          ? thumbnail
                          : 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80'
                      }
                      alt="book cover"
                      width="200px"
                      onClick={() => closeModal()}
                    />
                  </Link>
                  <h4>{title ? title : null}</h4>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default SearchResults;
