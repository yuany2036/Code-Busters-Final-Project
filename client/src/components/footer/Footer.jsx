import styles from './Footer.module.scss';
import React, { useState } from 'react';
import Logo from '../../assets/2.svg';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    console.log('New Subscriber:', email);
  };

  const location = useLocation();

  if (
    location.pathname === '/' ||
    location.pathname === '/about' ||
    location.pathname === '/explore'
  ) {
    return (
      <>
        <div className={styles.footer_container}>
          <div className={styles.container}>
            <div className={styles.footer_body}>
              <div className={styles.logo}>
                <img src={Logo} alt="website logo" />{' '}
              </div>

              <div className={styles.footer_list}>
                <ul className={styles.footer_list_item}>
                  <li className={styles.footer_list_item_link}>About</li>
                  <li className={styles.footer_list_item_link}>Contact</li>
                </ul>
                <ul className={styles.footer_list_item}>
                  <li className={styles.footer_list_item_link}>Explore</li>
                  <li className={styles.footer_list_item_link}>Instagram</li>
                </ul>
                <ul className={styles.footer_list_item}>
                  <li className={styles.footer_list_item_link}>Twitter</li>
                  <li className={styles.footer_list_item_link}>Facebook</li>
                </ul>
              </div>
            </div>

            <div className={styles.subscription}>
              <div className={styles.placeholder}></div>
              {subscribed ? (
                <p>Thank you for subscribing!</p>
              ) : (
                <form
                  action="https://gmail.us11.list-manage.com/subscribe/post?u=fc8ebb1b8769215b32f2a84c7&amp;id=9218b69f98&amp;f_id=007a9ae0f0"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  target="_self"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" />
                  <div className={styles.input_subscription}>
                    <input
                      type="email"
                      className={styles.signup}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email</label>
                    <button type="submit">Subscribe</button>
                  </div>
                </form>
              )}
            </div>
          </div>
          <div className={styles.copyright}>
            <p>© 2023 CodeBusters. All rights reserved.</p>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default Footer;
