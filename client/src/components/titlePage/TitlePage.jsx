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
import CrossUniverse from '../otherMedium/CrossUniverse';

const TitlePage = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [reviews, setReviews] = useState([]);
  const { id, category } = useParams();

  const isBook = category === 'books';

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        let res = await axios.get(
          `http://localhost:4000/${category}/searchById?id=${id}`
        );
        isBook && setTitle(res.data.volumeInfo);
        !isBook && setTitle(res.data);
        const identifier = !isBook
          ? id
          : res.data.volumeInfo.industryIdentifiers[0].identifier;
        res = await axios.get(
          `http://localhost:4000/${category}/reviews?id=${identifier}`
        );
        console.log('this should be reviews ->', res);
        category === 'movies' && setReviews(res.data.results);
        category === 'tvshows' && setReviews(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <>
      {loading && <Loading />}
      {!loading && title && (
        <div className={styles.title_page_container}>
          <TitleInfo title={title} isBook={isBook} isLoading={loading} />
          <CrossUniverse title={title} />
          <ViewByCategory />
          <Reviews reviews={reviews} />
        </div>
      )}
    </>
  );
};

export default TitlePage;
