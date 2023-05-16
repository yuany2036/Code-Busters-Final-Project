import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styles from './Reviews.module.scss';
import avatarPic from '../../assets/person-placeholder.jpeg';
import { NavLink } from 'react-router-dom';
import Loading from '../loading/Loading';
import { DataContext } from '../../data/context';

const ReviewsSoloPage = () => {
  const [expandedReviews, setExpandedReview] = useState([]);
  const { id, category } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const { backendURL } = useContext(DataContext);

  useEffect(() => {
    setLoading(true);
    const getReviews = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/${category}/reviews?id=${id}`
        );
        setReviews(response.data.results || response.data);
        console.log(category);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [id, category]);

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
  const readMoreHandler = function () {
    if (expandedReviews.includes(this)) {
      setExpandedReview((prev) => prev.filter((id) => id !== this));
    } else setExpandedReview((prev) => [...prev, this]);
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className={styles.reviews_container_solo}>
          <NavLink
            className={styles.back_button}
            to={`/title/${category}/${id}`}
          >
            back
          </NavLink>
          <h2 className={styles.heading}>Reviews</h2>
          <div className={styles.reviews_container_box}>
            {reviews.map(
              (
                {
                  author,
                  author_details: { rating, username, avatar_path },
                  content,
                  created_at,
                  id,
                },
                index
              ) => {
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
                          {expandedReviews.includes(id)
                            ? '(hide)'
                            : '(read more)'}
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
          </div>
          <NavLink
            className={styles.back_button}
            to={`/title/${category}/${id}`}
          >
            back
          </NavLink>
        </div>
      )}
    </>
  );
};

export default ReviewsSoloPage;
