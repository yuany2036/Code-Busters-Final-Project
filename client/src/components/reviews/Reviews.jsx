import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './Reviews.module.scss';

const Reviews = ({ reviews }) => {
  const [expandedReviews, setExpandedReview] = useState([]);

  const readMoreHandler = function () {
    if (expandedReviews.includes(this)) {
      setExpandedReview((prev) => prev.filter((id) => id !== this));
    } else setExpandedReview((prev) => [...prev, this]);
  };

  const creatingReviewStar = (num) => {
    if (num === null) return;
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(
        <Icon key={i} icon="ic:baseline-star" width="20" height="20" />
      );
    }
    for (let i = 0; i < 10 - num; i++) {
      stars.push(
        <Icon
          key={i + 10}
          icon="ic:baseline-star-outline"
          width="20"
          height="20"
        />
      );
    }
    return stars;
  };

  console.log(reviews);
  console.log(reviews.length);

  return (
    <div className={styles.reviews_container}>
      <h3 className={styles.heading}>Reviews:</h3>
      {reviews
        // slice(0, 3).
        .map(
          (
            {
              author,
              author_details: { rating, username },
              content,
              created_at,
              // updated_at,
              id,
            },
            index
          ) => {
            console.log(index);
            const date = new Date(created_at);
            const formattedDate = date.toLocaleDateString();
            return (
              <div
                key={index}
                // className={styles.review_container}
              >
                <h5>{`${
                  author ? author : username
                } reviewed on ${formattedDate}`}</h5>
                <h6>{creatingReviewStar(rating)}</h6>
                <p>
                  {expandedReviews.includes(id)
                    ? content
                    : `${content.slice(0, 200)}...`}
                  <button
                    className={styles.buttons}
                    onClick={readMoreHandler.bind(id)}
                  >
                    {expandedReviews.includes(id) ? '(hide)' : '(read more)'}
                  </button>
                </p>
              </div>
            );
          }
        )}
      <button className={styles.buttons}>Read all reviews</button>
    </div>
  );
};

export default Reviews;