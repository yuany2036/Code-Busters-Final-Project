import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DataContext from '../../data/context';
import MovieCard from '../card/MovieCard';
import TvShowCard from '../card/TvShowCard';
import BookCard from '../card/BookCard';
import axios from 'axios';

import styles from '../collection/Collection.module.scss';
import { Icon } from '@iconify/react';

const Collection = () => {
  const { user } = useContext(DataContext);
  const [movieCollection, setMovieCollection] = useState([]);
  const [tvShowCollection, setTvShowCollection] = useState([]);
  const [bookCollection, setBookCollection] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Movies');
  const [movieCollectionEmpty, setMovieCollectionEmpty] = useState(true);
  const [bookCollectionEmpty, setBookCollectionEmpty] = useState(true);
  const [tvShowCollectionEmpty, setTvShowCollectionEmpty] = useState(true);

  const navigate = useNavigate();

  const imgUrl =
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';

  const navigateTo = () => {
    navigate('/profile');
  };

  const fetchMovieCollection = async () => {
    try {
      const response = await axios.get('movies/user');
      console.log(response.data.movies);
      setMovieCollection(response.data.movies);
      setActiveCategory('Movies');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleMovieRemoved = () => {
    fetchMovieCollection();
  };

  const fetchTvShowCollection = async () => {
    try {
      const response = await axios.get('tvshows/user');
      console.log(response.data.tvShows);
      setTvShowCollection(response.data.tvShows);
      setActiveCategory('TV Shows');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleTvShowRemoved = () => {
    fetchTvShowCollection();
  };

  const fetchBookCollection = async () => {
    try {
      const response = await axios.get('books/user');
      console.log(response.data.books);
      setBookCollection(response.data.books);
      setActiveCategory('Books');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleBookRemoved = () => {
    fetchBookCollection();
  };

  useEffect(() => {
    fetchMovieCollection();
  }, []);

  useEffect(() => {
    if (movieCollection.length === 0) {
      setMovieCollectionEmpty(true);
    } else {
      setMovieCollectionEmpty(false);
    }

    if (tvShowCollection.length === 0) {
      setTvShowCollectionEmpty(true);
    } else {
      setTvShowCollectionEmpty(false);
    }

    if (bookCollection.length === 0 || !bookCollection) {
      setBookCollectionEmpty(true);
    } else {
      setBookCollectionEmpty(false);
    }
  }, [movieCollection, tvShowCollection, bookCollection]);

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.header}>
          <div className={styles.image}>
            <div className={styles.avatar}>
              {' '}
              {user.avatarURL ? (
                <img src={user.avatarURL} alt="Profile Pic" />
              ) : (
                <div className={styles.new_circle}>
                  {user.username && user.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className={styles.profile_info}>
              <h2>Hi, {user.username}</h2>
              <p>Manage your collections</p>
            </div>
          </div>
          <div className={styles.settings}></div>
          <div className={styles.icon}>
            <Icon onClick={navigateTo} icon="ic:sharp-settings-suggest" />
            <p>Settings</p>
          </div>
        </div>
        <div className={styles.choose_collection}>
          <div onClick={fetchMovieCollection}>Movie Collection</div>
          <div onClick={fetchTvShowCollection}>TvShows Collection</div>
          <div onClick={fetchBookCollection}>Book Collection</div>
        </div>

        {activeCategory === 'Movies' &&
          (movieCollectionEmpty ? (
            <div className={styles.movie}>
              <p>Your collection is empty.</p>
              <p>
                Browse the{' '}
                <Link className={styles.link} to="/explore">
                  Explore
                </Link>{' '}
                page or try the Search bar to add your favorite titles to your
                Collection.
              </p>
            </div>
          ) : (
            <div className={`${styles.collection_container} ${styles.movie}`}>
              {movieCollection.map((movie) => (
                <MovieCard
                  styleClass={`${styles.card} ${styles.new_card}`}
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  activeCategory={activeCategory}
                  onMovieRemoved={handleMovieRemoved}
                />
              ))}
            </div>
          ))}
        {activeCategory === 'TV Shows' &&
          (tvShowCollectionEmpty ? (
            <div className={styles.tvShow}>
              <p>Your collection is empty.</p>
              <p>
                Browse the{' '}
                <Link className={styles.link} to="/explore">
                  Explore
                </Link>{' '}
                page or try the Search bar to add your favorite titles to your
                Collection.
              </p>
            </div>
          ) : (
            <div className={`${styles.collection_container} ${styles.tvShow}`}>
              {tvShowCollection.map((tvShow) => (
                <TvShowCard
                  styleClass={`${styles.card} ${styles.new_card}`}
                  key={tvShow.id}
                  id={tvShow.id}
                  title={tvShow.title}
                  posterPath={tvShow.poster_path}
                  activeCategory={activeCategory}
                  onTvShowRemoved={handleTvShowRemoved}
                />
              ))}
            </div>
          ))}
        {activeCategory === 'Books' &&
          (bookCollectionEmpty ? (
            <div className={styles.books}>
              <p>Your collection is empty.</p>
              <p>
                Browse the{' '}
                <Link className={styles.link} to="/explore">
                  Explore
                </Link>{' '}
                page or try the Search bar to add your favorite titles to your
                Collection.
              </p>
            </div>
          ) : (
            <div className={`${styles.collection_container} ${styles.books}`}>
              {bookCollection.map((book) => (
                <BookCard
                  styleClass={`${styles.card} ${styles.new_card}`}
                  key={book.id}
                  id={book.id}
                  authors={book.authors || []}
                  title={book.title}
                  thumbnail={book.poster_path ? book.poster_path : imgUrl}
                  activeCategory={activeCategory}
                  onBookRemoved={handleBookRemoved}
                />
              ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default Collection;
