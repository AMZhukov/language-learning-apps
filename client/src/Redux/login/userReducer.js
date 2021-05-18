import { LOGOUT, SET_USER } from './userTypes';

const initialState = {
  currentUser: {},
  isAuth: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
        isAuth: true,
      };
    case LOGOUT:
      return {
        ...state,
        userId: null,
        token: null,
        isAuth: false,
      };
    default:
      return state;
  }
};
