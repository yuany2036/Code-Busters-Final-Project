import styles from './Animation.module.scss';

const Animation = () => {
  return (
    <div>
      <div className={styles.imageContainer}>
        <img
          src="https://m.media-amazon.com/images/I/81RTbibf9FL._AC_SY550_.jpg"
          alt="Dune poster"
          className={styles.cover}
        />
        <img
          src="https://www.orbitbooks.net/wp-content/uploads/2022/06/Sapkowski_TimeofContempt_HC-scaled.jpg"
          className={styles.cover}
        />
        <img
          src="https://interfaceingame.com/wp-content/uploads/the-witcher-3-wild-hunt/the-witcher-3-wild-hunt-cover-375x500.jpg"
          alt="Dune poster"
          className={styles.cover}
        />
        <img
          src="https://static.netnaija.com/i/5VrNpEXPK9O.jpg"
          alt="Dune poster"
          className={styles.coverSmall}
        />
        <img
          src="https://images.booksense.com/images/264/453/9780316453264.jpg"
          alt="Dune poster"
          className={styles.coverSmall}
        />
        <img
          src="https://w0.peakpx.com/wallpaper/1012/486/HD-wallpaper-geralt-of-rivia-the-witcher-the-witcher-3.jpg"
          alt="Dune poster"
          className={styles.coverSmall}
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiCrJsZeVO4usMhPY7F4NB7n2vQS3nrqHWfOaeGaSj6LizEuUT3h8Vi0wlUFMJSUNuhV8&usqp=CAU"
          alt="Dune poster"
          className={styles.coverSmall}
        />
      </div>
    </div>
  );
};

export default Animation;
