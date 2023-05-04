import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading_container}>
      <div className={styles.loading_heart}>
        <div></div>
      </div>
      <p className={styles.heart_p}>Loading...</p>
    </div>
  );
};

export default Loading;
