import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
axios.default.withCredientials === true;
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
  const { id, category } = useParams();
  const apiKey = 'ad6c50ff4b12daee4d3c2b875c8684fc';
  const movieReviewURL = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`;

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        let res = await axios.get(
          `http://localhost:4000/${category}/searchById?id=${id}`
        );
        setTitle(res.data);
        res = await axios.get(movieReviewURL, {
          accessControlAllowOrigin: 'http://localhost:5173/',
          withCredentials: false,
          mode: 'cors',
        });
        setReviews(res.data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // const movie_id = 76600; //avatar
  // // const movie_id = 677179; //creed 3
  // // const movie_id = 496243; //parasite
  // const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`;

  // useEffect(() => {
  //   setLoading(true);
  //   (async () => {
  //     try {
  //       let res = await axios.get(movieDetailsUrl, {
  //         accessControlAllowOrigin: 'http://localhost:5173/',
  //         withCredentials: false,
  //         mode: 'cors',
  //       });
  //       setTitle(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

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
