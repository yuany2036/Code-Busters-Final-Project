import { Icon } from '@iconify/react';
import styles from './Reviews.module.scss';

const Reviews = ({ reviews }) => {
  //   reviews.forEach(({ author_details: { avatar_path, rating, username } }) => {
  //     console.log(avatar_path, rating, username);
  //   });
  const creatingReviewStar = (num) => {
    if (num === null) return;
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<Icon icon="ic:baseline-star" width="20" height="20" />);
    }
    for (let i = 0; i < 10 - num; i++) {
      stars.push(
        <Icon icon="ic:baseline-star-outline" width="20" height="20" />
      );
    }
    return stars;
  };
  return (
    <div className={styles.reviews_container}>
      <h3>Reviews:</h3>
      {reviews
        // .slice(0, 2)
        .map(
          ({
            author,
            author_details: { rating, username },
            content,
            created_at,
            updated_at,
            id,
          }) => {
            return (
              <div key={id} className={styles.review_container}>
                <h5>{author ? author : username}</h5>
                <h6>{creatingReviewStar(rating)}</h6>
                <h6>{created_at}</h6>
                <p>{content}</p>
              </div>
            );
          }
        )}
    </div>
  );
};

export default Reviews;
