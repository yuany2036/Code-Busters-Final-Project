import { useEffect, useState } from 'react';
import axios from 'axios';
// import styles from './TitlePage.module.scss';
import Loading from '../loading/Loading';
import TitleInfo from './TitleInfo/TitleInfo';
import ViewByCategory from '../ViewByCategory/ViewByCategory';
import Reviews from '../reviews/Reviews';
import styles from './TitlePage.module.scss';

const TitlePage = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [reviews, setReviews] = useState([]);

  const apiKey = 'ad6c50ff4b12daee4d3c2b875c8684fc';
  const movie_id = 76600; //avatar
  // const movie_id = 677179; //creed 3
  // const movie_id = 496243; //parasite
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`;

  const movieReviewURL = `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${apiKey}&language=en-US&page=1`;

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        let res = await axios.get(movieDetailsUrl);
        setTitle(res.data);
        res = await axios.get(movieReviewURL);
        setReviews(res.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && title && (
        <div className={styles.title_page_container}>
          <TitleInfo title={title} reviews={reviews} />
          <ViewByCategory />
          <Reviews reviews={reviews} />
        </div>
      )}
    </>
  );
};

export default TitlePage;
