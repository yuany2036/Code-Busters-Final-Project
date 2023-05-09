import axios from 'axios';
import { useContext } from 'react';
import { DataContext } from '../data/context';

const { backendURL } = useContext(DataContext);

axios.defaults.baseURL = backendURL;
axios.defaults.withCredentials = true; // allow us to include cookies

export const signup = async (dispatch, data) => {
  const { firstName, lastName, username, email, password, avatarURL } = data;
  try {
    const response = await axios.post('/auth/register', {
      firstName,
      lastName,
      username,
      email,
      password,
      avatarURL,
    });

    dispatch({
      type: 'LOGIN',
      payload: response.data.data.user,
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILED',
      payload: error.response.data.message,
    });
    return error.response.data;
  }
};

export const login = async (dispatch, data) => {
  const { email, password } = data;
  try {
    const response = await axios.post('/auth/login', {
      email,
      password,
    });
    dispatch({
      type: 'LOGIN',
      payload: response.data.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILED',
      payload: error.response.data.message,
    });
    return error.response.data;
  }
};

export const getUser = async (dispatch) => {
  try {
    const response = await axios.get('/me');
    dispatch({
      type: 'LOGIN',
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: 'LOGOUT',
    });
  }
};

export const logout = async (usersDispatch) => {
  try {
    const response = await axios.get('/auth/logout');
    usersDispatch({
      type: 'LOGOUT',
      payload: response.data.data,
    });
  } catch (error) {
    usersDispatch({
      type: 'LOGOUT',
    });
  }
};

export const updateUser = async (usersDispatch, data) => {
  try {
    const response = await axios.patch('/me', data);
    usersDispatch({
      type: 'UPDATE_USER',
      payload: response.data.data,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const deleteUser = async (usersDispatch) => {
  try {
    await axios.delete('/me');
    usersDispatch({
      type: 'DELETE_USER',
    });
  } catch (error) {
    console.log(error);
  }
};
export default {
  signup,
  getUser,
  login,
  logout,
  updateUser,
  deleteUser,
};
