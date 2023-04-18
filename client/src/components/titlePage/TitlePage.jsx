import { useEffect, useState } from 'react';
import axios from 'axios';
// import styles from './TitlePage.module.scss';
import Loading from '../loading/Loading';
import TitleInfo from './TitleInfo/TitleInfo';

const TitlePage = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const apiKey = 'ad6c50ff4b12daee4d3c2b875c8684fc';
  const movie_id = 76600;
  // const movie_id = 677179;
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`;

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await axios.get(url);
        console.log(res.data);
        setTitle(res.data);
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
      {!loading && title && <TitleInfo title={title} />}
    </>
  );
};

export default TitlePage;
