// import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Navigate, Link } from 'react-router-dom';

import { DataContext } from '../../data/context';
import { login } from '../../apiCalls/userApiCalls';
import styles from '../auth/Login.module.scss';
import img from '../../assets/Mobile login-cuate.png';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { usersDispatch, isUserLoggedIn, setError, setLoading } =
    useContext(DataContext);
  const navigate = useNavigate();

  if (isUserLoggedIn) return <Navigate to="/explore" replace />;

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await login(usersDispatch, data);
      if (res.statusCode < 400) {
        setLoading(false);
        return navigate('/explore');
      } else if (
        res.includes('UnauthorizedError: Invalid email password combination')
      ) {
        toast.error('Invalid email password combination. Please try again.');
      } else {
        toast.error('Something went wrong, please try again later.');
      }
      setLoading(false);
      setError(res);
    } catch (err) {
      console.error('err ->', err);
      setLoading(false);
      setError(err);
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.img_container}>
        <img src={img} alt="" />
        <a href="https://storyset.com/phone">Illustrations by Storyset</a>
      </div>
      <div className={styles.login}>
        <h1>Lights, Camera, Login! </h1>
        <p>Welcome back, your Entertainment Oasis Awaits.</p>
        <div className={styles.login_form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
              <input
                name="email"
                placeholder="Email"
                {...register('email', {
                  required: 'Enter your email.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email is invalid.',
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
                  required: 'Enter your password',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
              />
              <div className={styles.error_message}>
                {errors.password && <span>{errors.password.message}</span>}
              </div>
            </div>

            <div className={styles.submit}>
              <input type="submit" value="Login" />
            </div>
          </form>
          <div className={styles.connect}>
            <p>
              <span>-</span> or login with <span>-</span>
            </p>
            <div className={styles.icons}>
              <a>
                <Icon icon="logos:facebook" color="#7e57c2" />
              </a>
              <a>
                <Icon icon="devicon:google" color="#7e57c2" />
              </a>
            </div>
          </div>
          <div className={styles.register}>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
