import React, { useContext, useEffect, useState } from 'react';
import styles from './ProfileCircle.module.scss';
import DataContext from '../../data/context';
function ProfileCircle() {
  const { user } = useContext(DataContext);
  const [userName, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        console.log(user);
        const res = await user.username;
        setUsername(res);
        console.log(res);
      } catch (error) {
        console.error('Failed to fetch username:', error);
      }
    };
    fetchUsername();
  }, []);
  const testingFunction = () => {
    console.log('working');
  };
  return (
    <div onClick={testingFunction} className={styles.circle}>
      {userName && userName.charAt(0).toUpperCase()}
    </div>
  );
}
export default ProfileCircle;
