// import { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Navigate } from 'react-router-dom';

import { DataContext } from '../../data/context';
import { login } from '../../apiCalls/userApiCalls';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    usersDispatch,
    isUserLoggedIn,
    error,
    setError,
    loading,
    setLoading,
    cartsDispatch,
  } = useContext(DataContext);
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
      }
      setLoading(false);
      setError(res);
    } catch (err) {
      console.log('err ->', err);
      setLoading(false);
      setError(err);
    }
  };

  return (
    <div className="login">
      <section>
        <div className="left">
          <h1>Welcome back!</h1>
          <p>Please fill in your credentials</p>
          <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="info">
                <input
                  name="email"
                  placeholder="Email"
                  {...register('email', {
                    required: 'Please put your email sir.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email is invalid. Please fix',
                    },
                  })}
                />
                <div className="error-message">
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
                <div className="error-message">
                  {errors.password && <span>{errors.password.message}</span>}
                </div>
              </div>

              <div className="submit">
                <input className="button-bg" type="submit" value="Log in" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
