import { useEffect, useState, useContext } from 'react';
import { Icon } from '@iconify/react';
import styles from './TitleInfo.module.scss';
import { DataContext } from '../../../data/context';
import axios from 'axios';

const TitleInfo = ({ title, isLoading, category, id, thumbnail }) => {
  const { isUserLoggedIn } = useContext(DataContext);
  // const [added, setAdded] = useState(false);
  const [infoArray, setInfoArray] = useState([]);
  const [poster, setPoster] = useState('');
  const [backDrop, setBackDrop] = useState('');
  const [summary, setSummary] = useState('');
  const [expanded, setExpanded] = useState(false);
  const {
    // Destructuring for movies and tv shows
    poster_path,
    tagline,
    overview,
    release_date,
    runtime,
    production_countries,
    original_language,
    genres,
    backdrop_path,
    title: titleName,
    name,
    // Destructuring for only tv shows
    number_of_episodes,
    number_of_seasons,
    first_air_date,
    // Destructuring for books
    pageCount,
    language,
    imageLinks,
    description,
    authors,
    categories,
    publishedDate,
  } = title;
  console.log(title);

  const expandSummary = () => {
    setExpanded((prev) => !prev);
  };

  const isBook = category === 'books';

  const languageNamesInEnglish = new Intl.DisplayNames(['en'], {
    type: 'language',
  });

  // const [added, setAdded] = useState(false);
  const [hearted, setHearted] = useState(false);

  const runtimeHours = Math.floor(runtime / 60);
  const runtimeMinutes = runtime % 60;

  useEffect(() => {
    if (!isBook) {
      // Setting poster, backdrop and summary
      setPoster(`https://image.tmdb.org/t/p/w300${poster_path}`);
      setBackDrop(`https://image.tmdb.org/t/p/w500${backdrop_path}`);
      setSummary(overview);
      // Creating array for info
      const shortInfoArray = [
        { tag: 'Genre', data: genres.map((genre) => genre.name).join(', ') },
        { tag: 'Country', data: production_countries[0]?.name },
        { tag: 'Language', data: languageNamesInEnglish.of(original_language) },
      ];
      // Additional info for movies
      if (category === 'movies')
        shortInfoArray.push(
          {
            tag: 'Runtime',
            data: `${runtimeHours}h ${runtimeMinutes}m`,
          },
          { tag: 'Release Date', data: release_date }
        );
      // Additional info for shows
      else
        shortInfoArray.push(
          { tag: 'Number of Seasons', data: number_of_seasons },
          { tag: 'Number of Episodes', data: number_of_episodes },
          { tag: 'First aired', data: first_air_date }
        );
      setInfoArray(shortInfoArray);
    } else {
      // Setting poster, backdrop and summary
      setSummary(description);
      const { thumbnail, smallThumbnail, small, medium, large } = imageLinks;
      setPoster(small || medium || large || thumbnail || smallThumbnail);
      setBackDrop(large || medium || small || thumbnail || smallThumbnail);
      // Cleaning up genre
      const cleanedCategories = new Set();
      categories?.map((set) =>
        set.split(' / ').map((single) => cleanedCategories.add(single))
      );
      // Creating array for books
      const shortInfoArray = [
        { tag: 'Author', data: authors.join(', ') },
        { tag: 'Page Count', data: pageCount },
        { tag: 'Language', data: languageNamesInEnglish.of(language) },
        { tag: 'Published Date', data: publishedDate },
        {
          tag: 'Genre',
          data: Array.from(cleanedCategories).slice(0, 5).join(', '),
        },
      ];
      setInfoArray(shortInfoArray);
    }
  }, [title]);

  const checkIfItemInCollection = async () => {
    if (isUserLoggedIn) {
      try {
        const endpoint = `/${category}/user`;
        const response = await axios.get(endpoint);
        const collection =
          category === 'tvshows'
            ? response.data['tvShows']
            : response.data[category];
        console.log(collection);
        const itemInCollection = collection.some(
          (item) => String(item.id) === String(id)
        );
        console.log(itemInCollection);
        setHearted(itemInCollection);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    checkIfItemInCollection();
  }, [id, isUserLoggedIn]);

  const addToCollection = async () => {
    try {
      const endpoint = `/${category}/user`;
      console.log(title.id);
      let data;
      if (category === 'books') {
        data = {
          authors,
          title: title.title, // Assuming 'title' is an object containing the book's title as a string
          thumbnail,
          id: title.id,
        };
      } else if (category == 'movies') {
        data = {
          title: title.title, // Assuming 'title' is an object containing the movie's title as a string
          posterPath: poster_path,
          id: title.id,
        };
      } else {
        data = {
          title: title.name, // Assuming 'title' is an object containing the movie's title as a string
          posterPath: poster_path,
          id: title.id,
        };
      }

      const response = await axios.post(endpoint, data);
      console.log(response);
      console.log('addItemToCollection id:', data.id);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCollection = async () => {
    try {
      const endpoint = `/${category}/user`;
      let itemId;
      if (category === 'books') {
        itemId = 'bookId';
      } else if (category === 'movies') {
        itemId = 'movieId';
      } else if (category === 'tvshows') {
        itemId = 'tvId';
      }

      const response = await axios.delete(endpoint, {
        data: { [itemId]: Number(id) },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(hearted);
  // console.log(added);

  // For rendering icons
  const Icons = () => {
    return (
      <>
        <div
          onClick={() => {
            setHearted((pre) => !pre);
            hearted ? removeFromCollection() : addToCollection();
          }}
        >
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
        <Icon icon="material-symbols:reviews-rounded" width="35" height="35" />
      </>
    );
  };

  return (
    <>
      {!isLoading && (
        <div className={styles.info_container}>
          <div
            className={styles.upper_container}
            style={{
              '--background-img': `url(${backDrop})`,
            }}
          >
            <div className={styles.overlay}></div>
            <div className={styles.upper_container_left}>
              <img
                src={poster}
                alt={`${category} ${isBook ? 'cover' : 'poster'}`}
                className={styles.poster_image}
              />
              <div className={styles.icons_container_under_poster}>
                {Icons()}
              </div>
              <h2 className={styles.title_name}>{titleName || name}</h2>
            </div>
            <div className={styles.upper_container_right}>
              <h2 className={styles.title_name}>{titleName || name}</h2>
              <h2 className={styles.tag_line}>{tagline}</h2>
              <p className={styles.overview}>
                {summary.length < 350 || expanded
                  ? summary
                  : `${summary.slice(0, 350)}...`}
              </p>
              {summary.length > 350 && (
                <button onClick={expandSummary}>
                  {expanded ? 'Hide' : 'Read more'}
                </button>
              )}
              <div className={styles.mapped_info_container}>
                {infoArray.map((info) => {
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
          <div className={styles.icons}>
            <div className={styles.icons_container}>{Icons()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default TitleInfo;
