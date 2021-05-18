import { LOGOUT, SET_USER } from './userTypes';
import axios from 'axios';

export const setUserAction = (userId, token) => {
  return {
    type: SET_USER,
    payload: { userId, token },
  };
};

export const loginResponse = (loginData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/sign-in', { ...loginData });
      dispatch(setUserAction(response.data.userId, response.data.token));
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};
