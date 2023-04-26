import MoviesList from './MoviesList';
import TvShowsList from './TvShowsList';
import styles from '../card/Card.module.scss';
import BestSellersList from './BestSellersList';
import Recommendations from './Recommendations'

const ExplorePage = () => {
  return (
    <div className={styles.container}>
      <MoviesList />
      <TvShowsList />
      <BestSellersList />
      <Recommendations/>
    </div>
  );
};

export default ExplorePage;
