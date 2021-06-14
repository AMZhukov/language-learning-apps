import { LOGOUT, SET_USER } from './userTypes';

const initialState = {
  currentUser: {},
  isAuth: false,
  isLogout: false,
  token: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isLogout: false,
        token: action.payload.token,
        isAuth: true,
      };
    case LOGOUT:
      console.log('is log out')
      return {
        ...state,
        isLogout: true,
        token: null,
        isAuth: false,
      };
    default:
      return state;
  }
};
