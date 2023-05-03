import React, { useState } from 'react';
import styles from './Contact.module.scss';
import { Icon } from '@iconify/react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [message, setMessage] = useState(false);

  const handleChange = (event) => {
    event.persist();

    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage(true);
    console.log(formData);
    axios({
      method: 'POST',
      url: 'https://formbold.com/s/9Bvjm',
      data: formData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className={styles.contact_container}>
        <div className={styles.container}>
          <div className={styles.illustration}></div>
          <div className={styles.form_container}>
            <div className={styles.contact_text}>
              <h1>
                Need help deciding what to watch or read? Get in touch with us!
              </h1>
              <p>
                If we aren't busy coding, we are more than glad to give you
                personal recommendations.
              </p>
            </div>
            <div className={styles.contact_form}>
              {message ? (
                <p>Thank you for your message! We will get back to you soon!</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Your message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <button className={styles.submit} type="submit">
                    Send
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className={styles.contact_more}>
          <h4>Follow us on</h4>
          <div className={styles.line}></div>
          <ul className={styles.list}>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                <Icon icon="uil:facebook-f" />{' '}
              </a>
            </li>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                <Icon icon="gg:twitter" />{' '}
              </a>
            </li>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                <Icon icon="simple-icons:instagram" />{' '}
              </a>
            </li>
            <li className={styles.item}>
              <a href="#" className={styles.link}>
                <Icon icon="akar-icons:linkedin-fill" />{' '}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contact;
