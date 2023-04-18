import styles from './Cards.module.scss';

const Cards = ({ titles }) => {
  return (
    <div className={styles.poster_container}>
      {titles.map(({ poster_path, title }) => {
        return (
          <img
            src={`https://image.tmdb.org/t/p/w92${poster_path}`}
            alt="movie poster"
            key={title}
          />
        );
      })}
    </div>
  );
};

export default Cards;
