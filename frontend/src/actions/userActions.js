import Axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/userConstants';

export const login = (email, password) => async dispatch => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/users/login', { email, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async dispatch => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/users/register', {
      name,
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.error.message //TODO: test validation error messages
          ? error.response.data.error.message
          : error.message,
    });
  }
};

export const signout = () => dispatch => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_SIGNOUT });
};
