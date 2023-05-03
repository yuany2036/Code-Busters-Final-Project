import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.load_container}>
      <div className={styles.loading}>Loading...</div>
    </div>
  );
};

export default Loading;
