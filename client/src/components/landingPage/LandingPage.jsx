import React from "react";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";
import styles from "./LandingPage.module.scss";

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
