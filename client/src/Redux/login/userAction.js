import { LOGOUT, SET_USER } from './userTypes';
import axios from 'axios';

export const setUserAction = (userId, token) => {
  return {
    type: SET_USER,
    payload: { token },
  };
};

export const logoutAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/logout');
      console.dir(response.data);
      dispatch({ type: LOGOUT });
    } catch (error) {
      console.log('Неудалось разлогиниться');
      return null;
    }
  };
};
