import React from "react";
import styles from "./About.module.scss";

const About = () => {
  return (
    <>
      <div className={styles.about}>
        <div className={styles.mission}>
          <h2>Our Mission</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim perferendis numquam repellat quod, repudiandae dolor fugiat asperiores rem natus quo
            dolorum ducimus ipsam nostrum quis veniam dolorem! Quia, dolore consequatur.
          </p>
        </div>
        <div className={styles.contributors}>
          <div>Gladys</div>
          <div>Mihaela</div>
          <div>Niko</div>
          <div>Yu-An</div>
        </div>
      </div>
    </>
  );
};

export default About;
