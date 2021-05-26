import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../Validation/logIn';
import { LogoLink } from '../LogoLink/LogoLink';
import { InputForReactHookForm as Input } from '../Input/InputForReactHookForm';

import { loginResponse } from '../../Redux/login/userAction';

import 'normalize.css';
import './SignIn.scss';

export const SignIn = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  const loginHangler = (loginData) => {
    dispatch(loginResponse(loginData));
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
