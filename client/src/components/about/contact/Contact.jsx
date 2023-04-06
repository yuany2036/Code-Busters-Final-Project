import React from 'react';
import styles from './Contact.module.scss';
import { Icon } from '@iconify/react';

const Contact = () => {
  return (
    <>
      <div className={styles.contact_container}>
        <div className={styles.contact_text}>
          <h1>Don't know what to watch or to read?Contact Us!</h1>
          <p>
            If we aren't busy coding, we are more than glad to give you personal
            recommendations.
          </p>
        </div>
        <div className={styles.contact_form}>
          <form>
            <input type="text" name="name" placeholder="Name" />

            <input type="email" name="email" placeholder="Email" />

            <textarea name="message" placeholder="Your message" />

            <button className={styles.submit} type="submit">
              Send
            </button>
          </form>
        </div>

        <div className={styles.contact_more}>
          <h4>Follow us on</h4>
          <div className={styles.line}></div>
          <ul className={styles.list}>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                <Icon icon="iconoir:facebook-tag" />
              </a>
            </li>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                <Icon icon="ph:twitter-logo-light" />
              </a>
            </li>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                <Icon icon="basil:gmail-outline" />
              </a>
            </li>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                <Icon icon="teenyicons:linkedin-outline" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contact;
