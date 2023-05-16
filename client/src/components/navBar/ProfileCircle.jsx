import React, { useContext, useEffect, useState } from 'react';
import styles from './ProfileCircle.module.scss';
import DataContext from '../../data/context';
import { useNavigate } from 'react-router-dom';

function ProfileCircle(showDropDownMenu) {
  const { user } = useContext(DataContext);
  const [userName, setUserName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await user.username;
        setUserName(res);
        const avatarRes = await user.avatarURL;
        setAvatarUrl(avatarRes);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const goToProfile = () => {
    navigate('/profile');
    showDropDownMenu();
  };

  return (
    <div onClick={goToProfile} className={styles.circle}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Profile"
          // style={{ width: '100%', height: '100%', borderRadius: '30px' }}
        />
      ) : (
        userName && userName.charAt(0).toUpperCase()
      )}
    </div>
  );
}

export default ProfileCircle;
