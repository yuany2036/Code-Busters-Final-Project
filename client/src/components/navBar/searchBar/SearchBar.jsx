import Magnify from '~icons/mdi/magnify';
import styles from '../NavBar.module.scss';

const SearchBar = ({ searchValue, searchHandler }) => {
  return (
    <div className={styles.search_bar}>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={searchHandler}
      />
      <Magnify className={styles.search_icon} />
    </div>
  );
};

export default SearchBar;
