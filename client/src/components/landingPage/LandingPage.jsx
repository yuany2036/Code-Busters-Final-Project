import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.scss';
import video from '../../assets/Nebula_Background.mp4';
import Animation from './landingAnimation/Animation';
import Carousel from './Carousel';

const LandingPage = () => {
  const animationRef = useRef(null);

  const handleArrowClick = () => {
    animationRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <video className={styles.bg_video} autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
          <div className={styles.title}>
            <div className={styles.text_h1}>
              <h1>ENTSCAPE</h1>
            </div>
            <div className={styles.text_p}>
              <p>Explore the Universe of Entertainment</p>
            </div>
          </div>
          <div className={styles.arrow} onClick={handleArrowClick}></div>
        </div>
        <div className={styles.parallax}>
          <div ref={animationRef} className={styles.first_section}>
            <Carousel />
            <div className={styles.first_section_p}>
              <p>Discover Movies, Tv-Shows and Books </p>
              <p>..and add them to your Collection</p>
            </div>
          </div>

          <div className={styles.second_section}>
            <p>
              Whether you're looking for a new book to read, a movie to watch,
              or a edge-cutting tv show to try, we've got you covered.{' '}
            </p>
            <div className={styles.wrapper}>
              <div className={styles.wrapper_inner}>
                <div className={styles.scroll_down}>
                  <span className={styles.arrow_down}></span>
                  <span className={styles.scroll_title}>
                    <Link className={styles.link} to="/register">Share your preferences with us</Link>
                  </span>
                </div>
              </div>
            </div>
            <p> ..and let us help you find your next favorite thing!</p>{' '}
          </div>

          <div className={styles.third_section}>
            <div className={styles.animation}>
              <Animation />
            </div>
            <div className={styles.section_p}>
              <p>
                <span>Entscape</span> - one place to discover them all
              </p>
              <p className={styles.hidden}>
                ..find a title and we will link it across the Universe of
                Entertainment
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
