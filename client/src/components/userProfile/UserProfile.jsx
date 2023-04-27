import { useForm } from 'react-hook-form';
import { useContext, useState, useEffect, useRef } from 'react';
import { DataContext } from '../../data/context';
import { useNavigate } from 'react-router-dom';

import { updateUser, deleteUser, logout } from '../../apiCalls/userApiCalls';
import styles from '../userProfile/UserProfile.module.scss';
import { Icon } from '@iconify/react';
import img from '../../assets/user.png';

const Profile = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, usersDispatch,setError} = useContext(DataContext);
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar);
    }
  }, [user]);

  const onSubmit = async (data) => {
    try {
      const response = await updateUser(usersDispatch, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOnClick = async (data, event) => {
    event.preventDefault();
    try {
      const response = await deleteUser(usersDispatch, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const logoutOnClick = async (data) => {
    try {
      const response = await logout(usersDispatch, data);
       if (response.statusCode < 400) {
         return navigate('/explore');
       }
       setError(response);

    } catch (error) {
      console.log(error);
    }
  };
  const onAvatarChange = (e) => {
    const fileSelected = e.target.files[0];
    const fileReader = new FileReader();

    // concert to base64 encoded string
    fileReader.readAsDataURL(fileSelected);

    // wait until file is fully loaded / converted to base64 (once fully loaded the "onloadedend" event below fires)
    fileReader.onloadend = () => {
      setAvatar(fileReader.result);
    };
  };

  const updateAvatar = async () => {
    try {
      const response = await updateUser(usersDispatch, { avatar });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickAvatar = () => {
    fileInputRef.current.click();
  };
  return (
    <div className={styles.profile_container}>
      <h1>Your profile Information, Mihaela {user.firstName}</h1>
      <p>Here you can edit your personal info and update your profile photo</p>
      <div className={styles.profile}>
        <div className={styles.profile_image}>
          <h3>Profile Image</h3>{' '}
          <div className={styles.avatar} onClick={handleClickAvatar}>
            <img src={avatar ? avatar : img} alt="placeholder" />
          </div>
          <div className={styles.upload}>
            <input
              type="file"
              accept="image/*"
              name="avatar"
              onChange={onAvatarChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
          </div>
          <div className={styles.submit}>
            <input
              type="submit"
              className="button-bg"
              value="Update Photo"
              onClick={updateAvatar}
            />
          </div>
        </div>
        <div className={styles.change_form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  name="firstName"
                  placeholder="First name"
                  defaultValue={user.firstName}
                />
                <div className={styles.error_message}>
                  {errors.firstName && <span>{errors.firstName.message}</span>}
                </div>
              </div>
              <div>
                <label htmlFor="LastName">Last Name:</label>

                <input
                  name="lastName"
                  placeholder="Last name"
                  defaultValue={user.lastName}
                />
                <div className={styles.error_message}>
                  {errors.lastName && <span>{errors.lastName.message}</span>}
                </div>
              </div>
              <div>
                <label htmlFor="username">Username:</label>

                <input
                  name="username"
                  placeholder="Username"
                  defaultValue={user.username}
                />
                <div className={styles.error_message}>
                  {errors.lastName && <span>{errors.username.message}</span>}
                </div>
              </div>
              <div>
                <label htmlFor="email">Email:</label>

                <input
                  name="email"
                  placeholder="Email"
                  defaultValue={user.email}
                />
                <div className={styles.error_message}>
                  {errors.email && <span>{errors.email.message}</span>}
                </div>
              </div>
            </div>
            <div className={styles.submit}>
              <input type="submit" value="Save Changes" />
            </div>
          </form>
        </div>
      </div>
      <div className={styles.more_actions}>
        <h3>
          <span>More Actions</span>

          <Icon icon="material-symbols:arrow-right-alt" color="#401d56" />
        </h3>
        <div>
          <button onClick={logoutOnClick}>Logout</button>
          <div className={styles.delete_btn}>
            <button
              onClick={deleteOnClick}
              title="Note! Deleting your account is permanent"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
