import { ThunkAction } from 'redux-thunk';

export const SET_USER = 'SET_USER';
export const LOGOUT = 'LOGOUT';

export enum userTypes {
  SET_USER = 'SET_USER',
  LOGOUT = 'LOGOUT',
  CHECK_AUTH = 'CHECK_AUTH',
  LOGIN_ACTION = 'LOGIN_ACTION',
  SET_LIST_USERS = 'SET_LIST_USERS',
}

export interface UserState {
  currentUser: any; // Здесь нужно будет переделать
  isAuth: boolean;
  isLogout: boolean;
  token: string | null;
  listUsers: any[];
}

export type UsersList = {
  username: string;
  email: string;
}[];

export type UserAction = SetUserAction | LogoutAction | setListUsers;

export type ThunkType = ThunkAction<Promise<void>, UserState, unknown, UserAction>;

interface SetUserActionPayload {
  token: string;
}

interface SetUserAction {
  type: userTypes.SET_USER;
  payload: SetUserActionPayload;
}

interface LogoutAction {
  type: userTypes.LOGOUT;
}

export interface setListUsers {
  type: userTypes.SET_LIST_USERS;
  payload: { listUsers: UsersList };
}

export interface LoginActionOnset {
  email: string;
  password: string;
}

export interface RegistrationActionOnset {
  email: string;
  password: string;
  username: string;
}
