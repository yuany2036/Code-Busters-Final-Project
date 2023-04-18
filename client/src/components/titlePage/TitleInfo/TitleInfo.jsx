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

  const runtimeHours = Math.floor(runtime / 60);
  const runtimeMinutes = runtime % 60;

  const genresArray = genres.map((genre) => genre.name);

  //   const shortInfoArray = [
  //     { release_date },
  //     { runtime },
  //     { production_countries },
  //     { spoken_languages },
  //     { genre: genresArray },
  //   ];

  return (
    <div className={styles.info_container}>
      <div className={styles.upper_container}>
        <img
          src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
          alt="movie poster"
        />
        <h2>{titleName}</h2>
        <div className={styles.icons_container}>
          <Icon icon="ic:baseline-plus" width="44" height="44" />
          <Icon icon="mdi:cards-heart-outline" width="35" height="35" />
          <Icon icon="material-symbols:share-outline" width="35" height="35" />
          <Icon icon="icon-park-outline:write" width="35" height="35" />
        </div>
      </div>
      <div className={styles.lower_container}>
        <h3>{tagline}</h3>
        <p>{overview}</p>
        <h5>RELEASED {release_date}</h5>
        <h5>RUNTIME {`${runtimeHours}h ${runtimeMinutes}m`}</h5>
        <h5>COUNTRY {production_countries[0].name}</h5>
        <h5>LANUAGES {spoken_languages[0].english_name}</h5>
        <h5>GENRES {genresArray.join(', ')}</h5>
      </div>
    </div>
  );
};

export default TitleInfo;
