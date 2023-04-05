import React from 'react';
import About from './about/About';
import Contact from './contact/Contact';
import Footer from './footer/Footer';
import styles from './LandingPage.module.scss';

const LandingPage = () => {
  return (
    <>
      <div className={styles.landing_container}>
        <div className={styles.background}>LandingPage</div>
        <About />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
