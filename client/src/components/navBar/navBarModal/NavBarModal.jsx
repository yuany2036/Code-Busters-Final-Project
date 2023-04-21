import React from 'react';
import ReactDOM from 'react-dom';
import styles from './NavBarModal.module.scss';
import SearchBar from '../searchBar/SearchBar';

function NavBarModal({ children, onClose }) {
  const closeModal = () => {
    onClose();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div className={styles.overlay} onClick={closeModal}></div>,
        document.getElementById('overlayRoot')
      )}
      {ReactDOM.createPortal(
        <div className={styles.modal}>
          <SearchBar />
          {/* <div className={styles.modal_content}>{children}</div> */}
        </div>,
        document.getElementById('modalRoot')
      )}
      {/* <div className={styles.modal}>
        <button className={styles.close_button} onClick={closeModal}>
          Close
        </button>
      </div> */}
    </>
  );
}

export default NavBarModal;
