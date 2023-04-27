import React, { useContext, useEffect, useState } from 'react';
import styles from './ProfileCircle.module.scss';
import DataContext from '../../data/context';
import { useNavigate } from 'react-router-dom';
function ProfileCircle() {
  const { user } = useContext(DataContext);
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // console.log(user);
        const res = await user.username;
        setUserName(res);
        console.log(res);
      } catch (error) {
        console.error('Failed to fetch username:', error);
      }
    };
    fetchUsername();
  }, []);

  const goToProfile = () => {
    navigate('/profile');
  };
  return (
    <div onClick={goToProfile} className={styles.circle}>
      {userName && userName.charAt(0).toUpperCase()}
    </div>
  );
}
export default ProfileCircle;
