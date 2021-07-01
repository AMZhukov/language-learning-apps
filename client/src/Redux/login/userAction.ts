import axios from 'axios';

import {
  UserAction,
  userTypes,
  ThunkType,
  LoginActionOnset,
  RegistrationActionOnset,
  UsersList,
} from './userTypes';
import { AuthResponse } from '../../models/response/AuthResponse';
import { AuthService } from '../../Services/AuthService';

export const setUserAction = (token: string): UserAction => {
  return {
    type: userTypes.SET_USER,
    payload: { token },
  };
};

export const loginAction = ({ email, password }: LoginActionOnset): ThunkType => {
  return async (dispatch) => {
    const { data } = await AuthService.login({ email, password });
    dispatch(setUserAction(data.token));
  };
};

export const logoutAction = (): ThunkType => {
  return async (dispatch) => {
    try {
      await AuthService.logout();
      dispatch({ type: userTypes.LOGOUT });
    } catch (error) {
      console.log('Неудалось разлогиниться');
    }
  };
};

export const registrationAction = ({
  email,
  password,
  username,
}: RegistrationActionOnset): ThunkType => {
  return async (dispatch) => {
    const { data } = await AuthService.registration({ email, password, username });
    dispatch(setUserAction(data.token));
  };
};

export const refreshAuthAction = (): ThunkType => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get<AuthResponse>('/api/refresh', { withCredentials: true });
      dispatch(setUserAction(data.token));
    } catch (error) {
      console.log('Неудалось авторизоваться');
    }
  };
};

const setListUsers = (listUsers: UsersList): UserAction => {
  return {
    type: userTypes.SET_LIST_USERS,
    payload: { listUsers },
  };
};

export const getUsersAction = (): ThunkType => {
  return async (dispatch) => {
    try {
      const { data } = await AuthService.getUsers();
      dispatch(setListUsers(data.listUsers));
    } catch (error) {}
  };
};
