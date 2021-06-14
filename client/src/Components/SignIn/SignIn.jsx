import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import { setUserAction } from '../../Redux/login/userAction';
import { schema } from '../../Validation/logIn';

import { InputForReactHookForm as Input } from '../Input/CustomUniversalInputForReactHookForm.jsx';
import { LogoLink } from '../LogoLink/LogoLink';

import 'normalize.css';
import './SignIn.scss';

export const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  const loginHangler = async (loginData) => {
    try {
      const response = await axios.post('/api/sign-in', { ...loginData });
      dispatch(setUserAction(response.data.userId, response.data.token));
      history.push('/');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <main className="sign-in">
      <LogoLink />
      <h1>Вход в учётную запись</h1>
      <form onSubmit={handleSubmit(loginHangler)} className="sign-in__form">
        <div className="registration__label-wrapper">
          <label className="registration__label">
            Почта
            <Input
              name="email"
              className="registration__input"
              type="text"
              register={register}
              errors={errors}
            />
          </label>
        </div>
        <div className="registration__label-wrapper">
          <label className="registration__label">
            Пароль
            <Input
              name="password"
              className="registration__input"
              type="password"
              register={register}
              errors={errors}
            />
          </label>
        </div>
        <button type="submit">Войти</button>
      </form>
    </main>
  );
};
