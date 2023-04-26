import styles from '../NavBar.module.scss';

const MenuSearchBar = ({ searchValue, searchHandler }) => {
  return (
    <div className={styles.menu_search_bar}>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={searchHandler}
      />
    </div>
  );
};

export default MenuSearchBar;
