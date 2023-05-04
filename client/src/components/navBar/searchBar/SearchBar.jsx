import Magnify from '~icons/mdi/magnify';
import styles from '../NavBar.module.scss';

const SearchBar = ({ searchValue, searchHandler, searchRef }) => {
  return (
    <div className={styles.search_bar}>
      <input
        autoFocus
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={searchHandler}
        ref={searchRef}
      />
      <Magnify className={styles.search_icon} />
    </div>
  );
};

export default SearchBar;
