import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './Reviews.module.scss';
import avatarPic from '../../assets/person-placeholder.jpeg';
import { useNavigate } from 'react-router-dom';

const Reviews = ({ reviews, category, id }) => {
  const [expandedReviews, setExpandedReview] = useState([]);
  const navigate = useNavigate();
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

  const gotToReviews = () => {
    navigate(`/${category}/${id}/reviews`);
  };

  console.log(category);

  console.log(reviews);
  console.log(reviews.length);

  return (
    <div className={styles.reviews_container}>
      <h2 className={styles.heading}>Reviews</h2>
      {reviews.slice(0, 3).map(
        (
          {
            author,
            author_details: { rating, username, avatar_path },
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
            <div key={index} className={styles.review_container}>
              <div className={styles.review_container_left}>
                {avatar_path && avatar_path.length < 40 ? (
                  <img
                    src={`https://www.themoviedb.org/t/p/w100_and_h100_face/${avatar_path}`}
                    alt="avatar pic"
                  />
                ) : avatar_path && avatar_path.length >= 40 ? (
                  <img src={avatar_path.substring(1)} alt="avatar pic" />
                ) : (
                  <img src={avatarPic} alt="avatar pic" />
                )}

                <h5>{`${author ? author : username} `}</h5>
              </div>
              <div className={styles.review_container_right}>
                <h6>{creatingReviewStar(rating)}</h6>
                <p className={styles.review_text}>
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
                <p
                  className={styles.reviewed_on}
                >{`reviewed on ${formattedDate}`}</p>
              </div>
            </div>
          );
        }
      )}
      <button onClick={gotToReviews} className={styles.action_button}>
        Read all reviews
      </button>
    </div>
  );
};

export default Reviews;
