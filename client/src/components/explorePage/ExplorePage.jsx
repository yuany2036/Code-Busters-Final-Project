//import React, { useState, useEffect } from 'react';

const ExplorePage = () => {
 /* const [topMovies, setTopMovies] = useState([]);
  const [bestSellerBooks, setBestSellerBooks] = useState([]);
  const [mostWatchedTvSeries, setMostWatchedTvSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await fetch('https://api.example.com/movies');
        const moviesData = await moviesResponse.json();
        setTopMovies(moviesData);

        const booksResponse = await fetch('https://api.example.com/books');
        const booksData = await booksResponse.json();
        setBestSellerBooks(booksData);

        const tvSeriesResponse = await fetch(
          'https://api.example.com/tv-series'
        );
        const tvSeriesData = await tvSeriesResponse.json();
        setMostWatchedTvSeries(tvSeriesData);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
*/
  return (
    <div>
      <h1>Top Movies</h1>
      <ul>
        {/*  {topMovies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> ({movie.rating} rating)
          </li>
      ))}*/}
      </ul>

      <h1>Best-Selling Books</h1>
      <ul>
        {/* {bestSellerBooks.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
          </li>
       ))}*/}
      </ul>

      <h1>Most-Watched TV Series</h1>
      <ul>
        {/* {mostWatchedTvSeries.map((tvSeries) => (
          <li key={tvSeries.id}>
            <strong>{tvSeries.title}</strong> ({tvSeries.seasons} seasons)
          </li>
       ))}*/}
      </ul>
    </div>
  );
};

export default ExplorePage;
