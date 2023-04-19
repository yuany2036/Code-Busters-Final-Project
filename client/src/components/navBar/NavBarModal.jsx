import React from 'react';
import styles from './NavBarModal.module.scss';

function NavBarModal({ children, onClose }) {
  const closeModal = () => {
    onClose();
  };

  return (
    <div className={styles.modal}>
      <button className={styles.close_button} onClick={closeModal}>
        Close
      </button>
      <div className={styles.modal_content}>{children}</div>
    </div>
  );
}

export default NavBarModal;
