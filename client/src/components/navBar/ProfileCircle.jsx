import React, { useContext, useEffect, useState } from 'react';
import styles from './ProfileCircle.module.scss';
import DataContext from '../../data/context';

function ProfileCircle() {
  const { user } = useContext(DataContext);
  console.log(user);

  // const [username, setUsername] = useState('');

  // useEffect(() => {
  //   // Fetching username from backend
  //   const fetchUsername = async () => {
  //     try {
  //       const response = await fetch('/api/getUsername');
  //       const data = await response.json();
  //       setUsername(data.username);
  //     } catch (error) {
  //       console.error('Failed to fetch username:', error);
  //     }
  //   };

  //   fetchUsername();
  // }, []);

  const testingFunction = () => {
    console.log('working');
  };

  return (
    <div onClick={testingFunction} className={styles.circle}>
      U{/* {username.charAt(0).toUpperCase()} */}
    </div>
  );
}

export default ProfileCircle;
