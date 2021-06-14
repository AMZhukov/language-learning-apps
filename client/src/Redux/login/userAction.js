import { LOGOUT, SET_USER } from './userTypes';

export const setUserAction = (userId, token) => {
  return {
    type: SET_USER,
    payload: { token },
  };
};

export const logoutAction = () => {
  console.log('logoutAction');
  return {
    type: LOGOUT,
  };
};
