import React, { useState, useEffect } from 'react';
import TvShowCard from '../card/TvShowCard';
import styles from '../card/MovieCard.module.scss';

const TvShowsList = () => {
  const [tvShows, setTVShows] = useState([]);

 useEffect(() => {
   const fetchTVShows = async () => {
     const totalPages = 10; 
     let fetchedTVShows = [];

     for (let page = 1; page <= totalPages; page++) {
       const response = await fetch(
         `https://api.themoviedb.org/3/tv/popular?api_key=ad6c50ff4b12daee4d3c2b875c8684fc&language=en-US&page=${page}`
       );
       const data = await response.json();
       const englishTVShows = data.results.filter(
         (tvShow) => tvShow.original_language === 'en'
       );
       fetchedTVShows = fetchedTVShows.concat(englishTVShows);
     }

     setTVShows(fetchedTVShows.slice(0, 20));
   };

   fetchTVShows();
 }, []);


  return (
    <div>
      <h1 className={styles.top_movies}>Top Popular English TV Shows</h1>
      <div className={styles.explore_movies}>
              {tvShows.map((tvShow) => (
              <TvShowCard
            key={tvShow.id}
            title={tvShow.name}
            posterPath={tvShow.poster_path}
          />
      
        ))}
    </div></div>
  );
};

export default TvShowsList;


   