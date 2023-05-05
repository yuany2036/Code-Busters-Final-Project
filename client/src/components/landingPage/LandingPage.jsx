import React, { useRef } from 'react';
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
            <p>Share with us your preferences </p>
            <p>..and we will provide tailored recommendations for you</p>{' '}
          </div>

          <div className={styles.third_section}>
            <Animation></Animation>{' '}
            <div>
              <p>
                <span>Entscape</span> - one place to discover them all
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
