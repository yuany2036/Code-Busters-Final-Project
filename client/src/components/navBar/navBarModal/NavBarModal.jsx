import React from 'react';
import ReactDOM from 'react-dom';
import styles from './NavBarModal.module.scss';
import SearchBar from '../searchBar/SearchBar';
import SearchResults from './searchResults/SearchResults';
import Close from '~icons/mdi/close';

function NavBarModal({
  // children,
  closeModal,
  searchHandler,
  searchValue,
  showDropDownMenu,
}) {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.overlay} onClick={closeModal}></div>,
        document.getElementById('overlayRoot')
      )}
      {ReactDOM.createPortal(
        <div className={styles.modal}>
          <div className={styles.modal_top}>
            <h2>Search EntScape</h2>
            <button onClick={closeModal}>Close</button>
            <Close className={styles.close_icon} onClick={closeModal} />
          </div>
          <SearchBar searchValue={searchValue} searchHandler={searchHandler} />
          <SearchResults
            searchTerm={searchValue}
            closeModal={closeModal}
            showDropDownMenu={showDropDownMenu}
          />
        </div>,
        document.getElementById('modalRoot')
      )}
    </>
  );
}

export default NavBarModal;
