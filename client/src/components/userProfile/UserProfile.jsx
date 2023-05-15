import { useForm } from 'react-hook-form';
import { useContext, useState, useRef, useEffect } from 'react';
import { DataContext } from '../../data/context';
import { useNavigate, Link } from 'react-router-dom';

import { deleteUser, logout } from '../../apiCalls/userApiCalls';
import styles from '../userProfile/UserProfile.module.scss';
import { Icon } from '@iconify/react';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';

import img from '../../assets/user.png';
import axios from 'axios';

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, usersDispatch } = useContext(DataContext);
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setAvatar(user.avatarURL);
  }, [user.avatarURL]);

  const onSubmit = async (data) => {
    try {
      const updatedUserData = {};

      if (data.firstName && data.firstName !== user.firstName) {
        updatedUserData.firstName = data.firstName;
      }
      if (data.lastName && data.lastName !== user.lastName) {
        updatedUserData.lastName = data.lastName;
      }
      if (data.username && data.username !== user.username) {
        updatedUserData.username = data.username;
      }
      if (data.email && data.email !== user.email) {
        updatedUserData.email = data.email;
      }

      if (Object.keys(updatedUserData).length > 0) {
        const response = await axios.patch('/me', updatedUserData);
        console.log(response.data.data);
        if (response.status === 200) {
          usersDispatch({
            type: 'UPDATE_USER',
            payload: response.data.data,
          });
          toast.success('Your profile has been updated');
          // alert('Your profile has been updated');
          window.location.reload();
        }
      } else {
        alert('No changes were made');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOnClick = async (data) => {
    try {
      await deleteUser(usersDispatch, data);
      toast.success('Sad to see you leave, but your account has been deleted!');
      // alert('Your account has been deleted');
      return navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const logoutOnClick = async (data) => {
    try {
      await logout(usersDispatch, data);
      toast.success("You've been logged out!");
      // alert('You have been logged out');
      return navigate('/');
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
      const cloudinaryResponse = await axios.post('/cloud', {
        data: { base64Image: avatar },
      });

      if (cloudinaryResponse.status === 201) {
        const avatarUpdateResponse = await axios.patch('/me/update-avatar', {
          avatarURL: cloudinaryResponse.data.data.url,
        });
        usersDispatch({
          type: 'UPDATE_AVATAR',
          payload: { avatar: avatarUpdateResponse.data.data.avatarURL },
        });
      }
      // alert('Your profile photo has been updated');
      toast.success('Your profile photo has been updated');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAvatar = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.profile_container}>
      <div className={styles.arrow_container}>
        <Icon icon="ic:outline-keyboard-double-arrow-left" color="#7e57c2" />
        <Link className={styles.arrow} to="/collection">
          Go back to Collection
        </Link>
      </div>

      <div className={styles.profile_greeting}>
        <h1>Your profile Information, {user.firstName}</h1>
        <p>
          Here you can edit your personal info and update your profile photo
        </p>
      </div>
      <div className={styles.profile}>
        <div className={styles.profile_image}>
          <h3>Profile Image</h3>{' '}
          <div className={styles.avatar}>
            <img src={avatar ? avatar : img} alt="placeholder" />
            <Icon
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Choose your photo"
              onClick={handleClickAvatar}
              icon="material-symbols:add-a-photo-rounded"
              color="#7e57c2"
              width="35"
              height="40"
            />
            <Tooltip id="my-tooltip" />
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
            <input type="submit" value="Update Photo" onClick={updateAvatar} />
          </div>
        </div>
        <div className={styles.change_form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
              <div>
                <label>First Name:</label>
                <input
                  {...register('firstName', { required: false })}
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  defaultValue={user.firstName ?? ''}
                />
                <div className={styles.error_message}>
                  {errors.firstName && <span>{errors.firstName.message}</span>}
                </div>
              </div>
              <div>
                <label>Last Name:</label>

                <input
                  {...register('lastName', { required: false })}
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  defaultValue={user.lastName ?? ''}
                />
                <div className={styles.error_message}>
                  {errors.lastName && <span>{errors.lastName.message}</span>}
                </div>
              </div>
              <div>
                <label>Username:</label>

                <input
                  {...register('username', { required: false })}
                  type="text"
                  name="username"
                  placeholder="Username"
                  defaultValue={user.username ?? ''}
                />
                <div className={styles.error_message}>
                  {errors.lastName && <span>{errors.username.message}</span>}
                </div>
              </div>
              <div>
                <label>Email:</label>

                <input
                  {...register('email', { required: false })}
                  type="email"
                  name="email"
                  placeholder="Email"
                  defaultValue={user.email ?? ''}
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
        <h3>More Actions</h3>

        <Icon
          icon="material-symbols:arrow-right-alt"
          color="#401d56"
          width="40"
        />
        <div>
          <button onClick={logoutOnClick}>Logout</button>
          <div className={styles.delete_btn}>
            <button
              onClick={deleteOnClick}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Note! Deleting your account is permanent"
            >
              Delete Account
            </button>
            <Tooltip id="my-tooltip" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
