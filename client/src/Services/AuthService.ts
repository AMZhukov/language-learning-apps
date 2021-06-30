import { api } from '../http';
import { AxiosResponse } from 'axios';
import {AuthResponse, GetUsersResponse} from '../models/response/AuthResponse';
// import { IUser } from '../models/IUser';

interface Ilogin {
  email: string;
  password: string;
}
interface IRegistrations {
  email: string;
  password: string;
  username: string;
}

export class AuthService {
  static async login({ email, password }: Ilogin): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/api/sign-in', { email, password });
  }

  static async registration({
    email,
    password,
    username,
  }: IRegistrations): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/api/registration', { email, password, username });
  }

  static async logout(): Promise<void> {
    return api.get('/api/logout');
  }

  static async getUsers(): Promise<AxiosResponse<GetUsersResponse>> {
    return api.get('/api/getUsers');
  }
}
