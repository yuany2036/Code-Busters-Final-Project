import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DataContext } from '../../data/context';
// importing the function from backend

const MovieRecommendations = () => {
  const [movies, setMovies] = useState([]);

      const { isUserLoggedIn, loading, setLoading } =
        useContext(DataContext);
    
  useEffect(() => {
    const fetchMovieRecommendations = async () => {
      try {
        const response = await axios.get('/api/recommendations');//what is the function
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch movie recommendations:', error);
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

  return (
    <div>
      <h1>Movie Recommendations</h1>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.title} ({movie.genre})
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
