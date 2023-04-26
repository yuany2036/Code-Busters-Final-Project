import { DataContext } from '../../data/context';
import { useContext } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signup } from '../../apiCalls/userApiCalls';
import styles from '../auth/Register.module.scss';
import img from '../../assets/Mobile login-pana.png';
import { Icon } from '@iconify/react';

const Register = () => {
  const { usersDispatch, isUserLoggedIn } = useContext(DataContext);

  if (isUserLoggedIn) {
    return <Navigate to="/preferences" replace />;
  }

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await signup(usersDispatch, data);
      console.log(data);

      if (res.statusCode < 400) {
        return navigate('/preferences');
      }
    } catch (err) {
      console.log('err ->', err);
    }
  };

  return (
    <div className={styles.register_container}>
      <div className={styles.img_container}>
        <img src={img} alt="" />
        <a href="https://storyset.com/phone">Illustrations by Storyset</a>
      </div>
      <div className={styles.register}>
        <h1>Register. Connect. Discover. </h1>
        <h2>EntScape.</h2>
        <p>
          Join us and unlock the full potential of our tools for an enhanced
          movie and book lovers experience.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="username"
            placeholder="Username"
            {...register('username', {
              required: 'Please put your first name.',
            })}
          />
          <div className={styles.error_message}>
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>

          <input
            name="firstName"
            placeholder="First name"
            {...register('firstName', {
              required: 'Please put your first name.',
            })}
          />
          <div className={styles.error_message}>
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>

          <input
            name="lastName"
            placeholder="Last name"
            {...register('lastName', {
              required: 'Please put your last name.',
            })}
          />
          <div className={styles.error_message}>
            {errors.lastName && <span>{errors.lastName.message}</span>}
          </div>

          <input
            name="email"
            placeholder="Email"
            {...register('email', {
              required: 'Enter your password',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email is invalid. Please fix',
              },
            })}
          />
          <div className={styles.error_message}>
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Required',
              minLength: {
                value: 5,
                message: 'Password must be at least 5 characters',
              },
            })}
          />
          <div className={styles.error_message}>
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <div className={styles.submit}>
            <input type="submit" value="Sign Up" />
          </div>
        </form>
        <div className={styles.connect}>
          <p>
            <span>-</span> or register with <span>-</span>
          </p>
          <div className={styles.icons}>
            <a href='http://localhost:4000/auth/facebook/callback'>
              <Icon icon="logos:facebook" color="#7e57c2" />
            </a>
            <a href='http://localhost:4000/auth/google/callback'>
              <Icon icon="devicon:google" color="#7e57c2" />
            </a>
          </div>
        </div>
        <div className={styles.login}>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
