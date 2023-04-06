import styles from './Footer.module.scss';
import React, { useState } from 'react';
//import { ReactComponent as Logo } from '../../assets/2.svg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    console.log('New Subscriber:', email);
  };
  return (
    <>
      <div className={styles.footer_container}>
        
        <div className={styles.footer_body}>
          <div className={styles.logo}>
            {/*<Logo />*/}
            <p>Entscape Logo</p>
          </div>

          <div className={styles.footer_list}>
            <ul className={styles.footer_list_item}>
              <li className={styles.footer_list_item_link}>About</li>
              <li className={styles.footer_list_item_link}>Explore</li>
              <li className={styles.footer_list_item_link}>Instagram</li>
              <li className={styles.footer_list_item_link}>Twitter</li>
              <li className={styles.footer_list_item_link}>Facebook</li>
            </ul>
          </div>
        </div>

        <div className={styles.footer_container_part2}>
          <div className={styles.subscription}>
            {subscribed ? (
              <p>Thank you for subscribing!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.input_subscription}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Email</label>
                <button type="submit">Subscribe</button></div>
              </form>
            )}
          </div>
          <div className={styles.copyright}>
            <p>© 2023 CodeBusters. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
