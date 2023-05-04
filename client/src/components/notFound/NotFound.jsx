import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';
import SearchBar from './SearchBar';

const NotFound = () => {


  return (
    <div className={styles.not_found}>
      <div className={styles.not_found_text}>
        <h1>
          Well... <span> this is</span> <span>awkward </span>
        </h1>
        <p>You definitely shouldn't be here.</p>
        <p>
          Feeling lost? Try searching the page or start
          <Link to="/">
            <span>fresh.</span>{' '}
          </Link>
        </p>
      </div>

      <SearchBar />

      <div className={styles.not_found_text2}>
        <h2>or</h2>
        <p>
          Don't neglect your books - give them some attention and maybe even
          throw in a movie for good measure. And once you've read the book and
          watched the movie, join the age-old debate of which one is better. Is
          it the book with its rich descriptions, or the movie with its stunning
          visuals? <span>You decide!</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
