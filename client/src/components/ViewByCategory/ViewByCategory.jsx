import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ViewByCategory.module.scss';
import Cards from './Cards';

const ViewByCategory = () => {
  const [activeCategory, setActiveCategory] = useState('Movies');

  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  const movieURL =
    'https://api.themoviedb.org/3/movie/popular?api_key=ad6c50ff4b12daee4d3c2b875c8684fc&language=en-US&page=1';

  const seriesURL =
    'https://api.themoviedb.org/3/tv/top_rated?api_key=ad6c50ff4b12daee4d3c2b875c8684fc&language=en-US&page=1';

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(movieURL, {
          accessControlAllowOrigin: 'http://localhost:5173/',
          withCredentials: false,
          mode: 'cors',
        });
        setMovies(res.data.results.slice(0, 15));
        res = await axios.get(seriesURL, {
          accessControlAllowOrigin: 'http://localhost:5173/',
          withCredentials: false,
          mode: 'cors',
        });
        setSeries(res.data.results.slice(0, 15));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const categories = [
    { category: 'Movies' },
    { category: 'TV Shows' },
    { category: 'Books' },
  ];

  return (
    <div className={styles.explore_section}>
      <h2>Explore the Universe</h2>
      <div className={styles.explore_section_container}>
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
        {activeCategory === 'Movies' && (
          <Cards titles={movies} activeCategory={activeCategory} />
        )}
        {activeCategory === 'TV Shows' && (
          <Cards titles={series} activeCategory={activeCategory} />
        )}
        {activeCategory === 'Books' && <h1>Books</h1>}
      </div>
    </div>
  );
};

export default ViewByCategory;
