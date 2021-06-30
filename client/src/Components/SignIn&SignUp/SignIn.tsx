import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { schema } from '../../Validation/logIn';

import { useActions } from '../../hooks/useActions.hook';
import { InputForReactHookForm as Input } from '../Input/CustomUniversalInputForReactHookForm';
import { LogoLink } from '../LogoLink/LogoLink';

import 'normalize.css';
import '../../layout.css';

import './SignIn&SignUp.scss';
import '../Form/Form.scss';
import { LoginActionOnset } from '../../Redux/login/userTypes';

export const SignIn: React.FC = () => {
  const history = useHistory();
  const { loginAction } = useActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  const loginHandler = async ({ email, password }: LoginActionOnset): Promise<void> => {
    email = email.toLowerCase();
    try {
      await loginAction({ email, password });
      history.push('/');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container">
      <main className="sign-in-sign-up">
        <LogoLink />
        <h1>Вход в учётную запись</h1>
        <form onSubmit={handleSubmit(loginHandler)} className="form">
          <div className="form__label-wrapper">
            <label className="form__label">
              Почта
              <Input
                name="email"
                className="form__input"
                type="email"
                register={register}
                errors={errors}
              />
            </label>
          </div>
          <div className="form__label-wrapper">
            <label className="form__label">
              Пароль
              <Input
                className="form__input"
                name="password"
                type="password"
                register={register}
                errors={errors}
              />
            </label>
          </div>
          <div className="form__button-wrapper">
            <button type="submit" className="form__button">
              Войти
            </button>
          </div>
        </form>
        <p className="sign-in-sign-up__p">
          Впервые на сайте?{' '}
          <Link className="sign-in-sign-up__link" to="/sign-up">
            Создайте аккаунт
          </Link>
        </p>
      </main>
    </div>
  );
};
