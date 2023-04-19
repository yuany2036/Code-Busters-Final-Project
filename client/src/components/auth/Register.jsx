import { DataContext } from '../../data/context';
import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signup } from '../../apiCalls/userApiCalls';
import styles from '../auth/Register.module.scss';

const Register = () => {
  const { usersDispatch, isUserLoggedIn } = useContext(DataContext);

  if (isUserLoggedIn) {
    return <Navigate to="/explore" replace />;
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
        return navigate('/explore');
      }
    } catch (err) {
      console.log('err ->', err);
    }
  };

  return (
    <div className={styles.register_container}>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="info">
            <div className="row">
              <div>
                <input
                  name="username"
                  placeholder="Username"
                  {...register('username', {
                    required: 'Please put your first name.',
                  })}
                />
                <div className="error-message">
                  {errors.firstName && <span>{errors.firstName.message}</span>}
                </div>
              </div>
              <div>
                <input
                  name="firstName"
                  placeholder="First name"
                  {...register('firstName', {
                    required: 'Please put your first name.',
                  })}
                />
                <div className="error-message">
                  {errors.firstName && <span>{errors.firstName.message}</span>}
                </div>
              </div>
              <div>
                <input
                  name="lastName"
                  placeholder="Last name"
                  {...register('lastName', {
                    required: 'Please put your last name.',
                  })}
                />
                <div className="error-message">
                  {errors.lastName && <span>{errors.lastName.message}</span>}
                </div>
              </div>
            </div>

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
            <input className="button-bg" type="submit" value="Sign Up" />
          </div>
        </form>
        <div className="right">
          <button>Connect with Facebook</button>
          <button>Connect with Google</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
