import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../../data/context';

const MovieRecommendations = () => {
  const [movies, setMovies] = useState([]);

  const { user, isUserLoggedIn, loading, setLoading } =
    useContext(DataContext);
  console.log(user.bookLover)

  useEffect(() => {
    const fetchMovieRecommendations = async () => {
      try {
        const response = await axios.get('/movies/recommend');
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch movie recommendations:', error.response.data);
        setLoading(false);
      }
    };

    if (isUserLoggedIn) {
      fetchMovieRecommendations();
    } else {
      setMovies([]);
      setLoading(false);
    }
  }, [isUserLoggedIn]);

  if (!isUserLoggedIn) {
    return <p>Please log in to view your own customized recommendations.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user.bookLover === true) {
    return <p>Sorry, we don't have any recommendations for you at this time.</p>;
  }
  return (
    <div>
      <h1>Movie Recommendations</h1>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.title}
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
              {movie.genre}
            </li>
          ))}
        </ul>
      ) : (
        <p>No movie recommendations available.</p>
      )}
    </div>
  );
};

export default MovieRecommendations;
