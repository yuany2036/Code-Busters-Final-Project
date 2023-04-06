import React, { useState } from 'react';
import styles from './Contact.module.scss';
import { Icon } from '@iconify/react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [message, setMessage] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(true);
    console.log(formData);
  };
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
          {message ? (
            <p>Thank you for your message!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
              />

              <button className={styles.submit} type="submit">
                Send
              </button>
            </form>
          )}
        </div>

        <div className={styles.contact_more}>
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
