import styles from '../card/Card.module.scss';
//import { Link, Navigate, useNavigate } from 'react-router-dom';

const CardButton = () => {
  /*  */

  return (
    <div className={styles.btn}>
      <button className={styles.outline}>Details</button>
      <button className={styles.fill} >
        Add
      </button>
    </div>
  );
};

export default CardButton;
