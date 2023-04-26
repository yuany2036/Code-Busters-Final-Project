import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true; // allow us to include cookies

export const signup = async (dispatch, data) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password
  } = data;
  try {
    const response = await axios.post('/auth/register', {
      firstName,
      lastName,
      username,
      email,
      password,
    });

    dispatch({
      type: 'LOGIN',
      payload: response.data.data
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILED',
      payload: error.response.data.message
    });
    return error.response.data;
  }
};

export const login = async (dispatch, data) => {
  const {
    email,
    password
  } = data;
  try {
    const response = await axios.post('/auth/login', {
      email,
      password,
    });

    dispatch({
      type: 'LOGIN',
      payload: response.data.data
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILED',
      payload: error.response.data.message
    });
    return error.response.data;
  }
};

export const getUser = async (dispatch) => {
  try {
    const response = await axios.get('/me');
    dispatch({
      type: 'LOGIN',
      payload: response.data.data
    });
    // return response.data.data;
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: 'LOGOUT'
    });
    // return error.response.data;
  }
};


export const logout = async (usersDispatch, cartsDispatch) => {
  try {
    await axios.get('/auth/logout');
    usersDispatch({
      type: 'LOGOUT'
    });
    cartsDispatch({
      type: 'RESET_CART'
    });
  } catch (error) {
    dispatch({
      type: 'LOGOUT'
    });
  }
};

export const updateUser = async (dispatch, data) => {
  try {
    const response = await axios.patch('/me', data);
    dispatch({
      type: 'UPDATE_USER',
      payload: response.data.data
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export default {
  signup,
  getUser,
  login,
  logout,
  updateUser
};