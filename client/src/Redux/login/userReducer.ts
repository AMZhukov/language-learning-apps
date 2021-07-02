import { UserAction, UserState, userTypes } from './userTypes';

const initialState: UserState = {
  currentUser: {},
  isAuth: false,
  isLogout: false,
  token: null,
  listUsers: [],
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case userTypes.SET_USER:
      console.log(action.payload.token, 'в редюсере');
      return {
        ...state,
        isLogout: false,
        token: action.payload.token,
        isAuth: true,
      };
    case userTypes.LOGOUT:
      return {
        ...state,
        isLogout: true,
        token: null,
        isAuth: false,
      };
    case userTypes.SET_LIST_USERS:
      return {
        ...state,
        listUsers: [...action.payload.listUsers],
      };
    default:
      return state;
  }
};
