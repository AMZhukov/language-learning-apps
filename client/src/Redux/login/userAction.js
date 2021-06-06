import { LOGOUT, SET_USER } from './userTypes';

export const setUserAction = (userId, token) => {
  return {
    type: SET_USER,
    payload: { userId, token },
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};
