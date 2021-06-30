import { IUser } from '../IUser';
import {UsersList} from "../../Redux/login/userTypes";

export interface AuthResponse {
  token: string;
  user: IUser;
}

export interface GetUsersResponse {
  listUsers: UsersList;
}
