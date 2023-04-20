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
        let res = await axios.get(movieURL);
        setMovies(res.data.results.slice(0, 9));
        res = await axios.get(seriesURL);
        setSeries(res.data.results.slice(0, 9));
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
      <h3>Explore the Universe:</h3>
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
      {activeCategory === 'Movies' && <Cards titles={movies} />}
      {activeCategory === 'TV Shows' && <Cards titles={series} />}
      {activeCategory === 'Books' && <h1>Books</h1>}
    </div>
  );
};

export default ViewByCategory;