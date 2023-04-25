import { useState } from 'react';
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
    original_language,
    genres,
    backdrop_path,
  } = props.title;

  const posterURL = `https://image.tmdb.org/t/p/w500${backdrop_path}`;

  const languageNamesInEnglish = new Intl.DisplayNames(['en'], {
    type: 'language',
  });

  const [added, setAdded] = useState(false);
  const [hearted, setHearted] = useState(false);

  const runtimeHours = Math.floor(runtime / 60);
  const runtimeMinutes = runtime % 60;

  const shortInfoArray = [
    { tag: 'Genre', data: genres.map((genre) => genre.name).join(', ') },
    { tag: 'Release Date', data: release_date },
    { tag: 'Runtime', data: `${runtimeHours}h ${runtimeMinutes}m` },
    { tag: 'Country', data: production_countries[0].name },
    { tag: 'Language', data: languageNamesInEnglish.of(original_language) },
  ];

  return (
    <div className={styles.info_container}>
      <div
        className={styles.upper_container}
        style={{ '--background-img': `url(${posterURL})` }}
      >
        <div className={styles.overlay}></div>
        <div className={styles.upper_container_left}>
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt="movie poster"
            className={styles.poster_image}
          />
          <h2>{titleName}</h2>
        </div>
        <div className={styles.upper_container_right}>
          <h2>{tagline}</h2>
          <p className={styles.overview}>{overview}</p>
          <div className={styles.mapped_info_container}>
            {shortInfoArray.map((info) => {
              return (
                <div key={info.tag} className={styles.mapped_info}>
                  <h3>{info.tag}</h3>
                  <p>{info.data}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.icons_container}>
        <div onClick={() => setAdded((pre) => !pre)}>
          <Icon
            icon={added ? 'charm:tick' : 'ic:baseline-plus'}
            width="44"
            height="44"
          />
        </div>
        <div onClick={() => setHearted((pre) => !pre)}>
          <Icon
            icon={
              hearted
                ? 'material-symbols:heart-minus'
                : 'material-symbols:heart-plus-outline'
            }
            width="35"
            height="35"
          />
        </div>
        <Icon icon="material-symbols:share-outline" width="35" height="35" />
        <Icon icon="carbon:star-review" width="35" height="35" />
      </div>
    </div>
  );
};

export default TitleInfo;
