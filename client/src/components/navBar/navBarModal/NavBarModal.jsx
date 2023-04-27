import React from 'react';
import ReactDOM from 'react-dom';
import styles from './NavBarModal.module.scss';
import SearchBar from '../searchBar/SearchBar';
// import ViewByCategory from '../../ViewByCategory/ViewByCategory';
import SearchResults from './searchResults/SearchResults';

function NavBarModal({
  // children,
  closeModal,
  searchHandler,
  searchValue,
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
          </div>
          <SearchBar searchValue={searchValue} searchHandler={searchHandler} />
          <SearchResults searchTerm={searchValue} closeModal={closeModal} />
          {/* <ViewByCategory /> */}
          {/* <div className={styles.modal_content}>{children}</div> */}
        </div>,
        document.getElementById('modalRoot')
      )}
    </>
  );
}

export default NavBarModal;
