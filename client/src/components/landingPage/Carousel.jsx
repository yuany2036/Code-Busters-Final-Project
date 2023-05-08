import styles from './Carousel.module.scss';
import poster1 from '../../assets/carouselPosters/game_of_thrones_series.jpeg';
import poster2 from '../../assets/carouselPosters/lord_of_the_rings_book.jpeg';
import poster3 from '../../assets/carouselPosters/avatar.jpeg';

const Carousel = () => {
  return (
    <div className={styles.carousel}>
      <div className={styles.container}>
        <input
          type="radio"
          name="slider"
          id={styles.pic_1}
          defaultChecked={true}
        />
        <input type="radio" name="slider" id={styles.pic_2} />
        <input type="radio" name="slider" id={styles.pic_3} />

        <div className={styles.cards}>
          <label
            className={styles.card}
            htmlFor={styles.pic_1}
            id={styles.poster_1}
          >
            <img src={poster1} alt={poster1} />
          </label>
          <label
            className={styles.card}
            htmlFor={styles.pic_2}
            id={styles.poster_2}
          >
            <img src={poster2} alt={poster2} />
          </label>
          <label
            className={styles.card}
            htmlFor={styles.pic_3}
            id={styles.poster_3}
          >
            <img src={poster3} alt={poster3} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
