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
import { useContext } from 'react';
import { DataContext } from '../../data/context';

const TitlePage = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [reviews, setReviews] = useState([]);
  const [relatedTitles, setRelatedTitles] = useState(true);
  const { id, category } = useParams();

  const { backendURL } = useContext(DataContext);

  const isBook = category === 'books';

  useEffect(() => {
    setLoading(true);
    setRelatedTitles(true);
    (async () => {
      try {
        let res = await axios.get(
          `${backendURL}/${category}/searchById?id=${id}`
        );
        isBook && setTitle(res.data.volumeInfo);
        !isBook && setTitle(res.data);
        const identifier = !isBook
          ? id
          : res.data.volumeInfo.industryIdentifiers[0].identifier;
        res = await axios.get(
          `${backendURL}/${category}/reviews?id=${identifier}`
        );
        category === 'movies' && setReviews(res.data.results);
        category === 'tvshows' && setReviews(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      }
    })();
  }, [id]);

  return (
    <>
      {loading && <Loading />}
      {!loading && title && (
        <div className={styles.title_page_container}>
          <TitleInfo
            title={title}
            isBook={isBook}
            isLoading={loading}
            category={category}
            id={id}
          />
          {relatedTitles && (
            <CrossUniverse
              title={title}
              category={category}
              setRelatedTitles={setRelatedTitles}
            />
          )}
          <ViewByCategory />
          <Reviews reviews={reviews} category={category} id={id} />
        </div>
      )}
    </>
  );
};

export default TitlePage;
