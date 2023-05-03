import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../data/context';
import ProfileCircle from '../navBar/ProfileCircle'

import styles from '../collection/Collection.module.scss';
import { Icon } from '@iconify/react';

const Collection = () => {
  const { user } = useContext(DataContext);
  const [nickname, setNickname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await user.username;
        setNickname(response);
        const avatarResponse = await user.avatarURL;
        setAvatarUrl(avatarResponse);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const navigateTo = () => {
    navigate('/profile');
  };

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.header}>
          <div className={styles.image}>
            <div className={styles.avatar}>
              {' '}
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile Pic" />
              ) : (
              < ProfileCircle/>
              )}
            </div>
            <div className={styles.profile_info}>
              <h2>Hi, {nickname}</h2>
              <p>Check your collections</p>
            </div>
          </div>
          <div
            className={styles.settings}
         
          ></div>
          <div className={styles.icon}>
            <Icon onClick={navigateTo} icon="ic:sharp-settings-suggest" />
            <p>Settings</p>
          </div>
        </div>
        <div className={styles.choose_collection}>
          <div>Movie Collection</div>
          <div>TvShows Collection</div>
          <div>Book Collection</div>
        </div>
        <div className={styles.collection_container}></div>
      </div>
    </>
  );
};

export default Collection;
