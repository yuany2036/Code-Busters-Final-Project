import { Icon } from '@iconify/react';
import styles from './TitleInfo.module.scss';

const TitleInfo = (props) => {
  const {
    poster_path,
    title: titleName,
    tagline,
    overview,
    release_date,
    runtime,
    production_countries,
    spoken_languages,
    genres,
  } = props.title;
  return (
    <div className={styles.info_container}>
      <div className={styles.upper_container}>
        <img
          src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
          alt="movie poster"
        />
        <h2>{titleName}</h2>
        <div className={styles.iconsContainer}>
          <Icon icon="ic:baseline-plus" />
          <Icon icon="mdi:cards-heart-outline" />
          <Icon icon="material-symbols:share-outline" />
          <Icon icon="icon-park-outline:write" />
        </div>
      </div>
      <div className={styles.lower_container}>
        <h3>{tagline}</h3>
        <p>{overview}</p>
        <h5>RELEASED {release_date}</h5>
        <h5>RUNTIME {runtime}</h5>
        <h5>COUNTRY {production_countries[0].name}</h5>
        <h5>LANUAGES {spoken_languages[0].english_name}</h5>
        <h5>GENRES {genres[0].name}</h5>
      </div>
    </div>
  );
};

export default TitleInfo;
