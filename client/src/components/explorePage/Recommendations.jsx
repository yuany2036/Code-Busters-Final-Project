import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../../data/context';
import MovieCard from '../card/MovieCard';

import styles from '../card/MovieCard.module.scss';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  const { user, isUserLoggedIn, loading, setLoading } = useContext(DataContext);
  console.log(user.bookLover);

  useEffect(() => {
    const fetchMovieRecommendations = async () => {
      try {
        const response = await axios.get('/movies/recommend');
        setRecommendations(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          'Failed to fetch movie recommendations:',
          error.response.data
        );
        setLoading(false);
      }
    };

    const fetchBookRecommendations = async () => {
      try {
        const response = await axios.get('/books/recommend');
        setRecommendations(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          'Failed to fetch book recommendations:',
          error.response.data
        );
        setLoading(false);
      }
    };

    if (isUserLoggedIn) {
      if (user.bookLover) {
        fetchBookRecommendations();
      } else {
        fetchMovieRecommendations();
      }
    } else {
      setRecommendations([]);
      setLoading(false);
    }
  }, [isUserLoggedIn, user.bookLover]);

  if (!isUserLoggedIn) {
    return (
      <p className={styles.recommendation_p}>
        Please log in to view your own customized recommendations.
      </p>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user.bookLover) {
    return (
      <div>
        <h1 className={styles.top_movies}>Book Recommendations</h1>
        {recommendations.length > 0 ? (
          <div className={styles.explore_movies}>
            {recommendations.map((book) => (
              // Render book cards here
              <div key={book.id}>
                <h2>{book.title}</h2>
                {/* img*/}
              </div>
            ))}
          </div>
        ) : (
          <p>No book recommendations available.</p>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h1 className={styles.top_movies}>Movie Recommendations</h1>
        {recommendations.length > 0 ? (
          <div className={styles.explore_movies}>
            {recommendations.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
                genre={movie.genre}
              />
            ))}
          </div>
        ) : (
          <p>No movie recommendations available.</p>
        )}
      </div>
    );
  }
};

export default Recommendations;
