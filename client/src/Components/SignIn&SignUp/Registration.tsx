import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { schema } from '../../Validation/registration';

import { useActions } from '../../hooks/useActions.hook';
import { InputForReactHookForm as Input } from '../Input/CustomUniversalInputForReactHookForm';
import { LogoLink } from '../LogoLink/LogoLink';
import { RegistrationActionOnset } from '../../Redux/login/userTypes';

import './SignIn&SignUp.scss';
import '../Form/Form.scss';

export const Registration: React.FC = () => {
  const history = useHistory();
  const { registrationAction } = useActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' });

  const registrationHandler = async ({
    email,
    password,
    username,
  }: RegistrationActionOnset): Promise<void> => {
    email = email.toLowerCase();
    try {
      await registrationAction({ email, password, username });
      history.push('/');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container">
      <main className="sign-in-sign-up">
        <LogoLink />
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit(registrationHandler)} className="form">
          <div className="form__label-wrapper">
            <label className="form__label">
              Имя пользователя
              <Input
                name="username"
                className="form__input"
                type="text"
                register={register}
                errors={errors}
              />
            </label>
          </div>
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
              Регистрация
            </button>
          </div>
        </form>
        <p className="sign-in-sign-up__p">
          Уже есть аккаунт?{' '}
          <Link className="sign-in-sign-up__link" to="/sign-in">
            Войдите в систему
          </Link>
        </p>
      </main>
    </div>
  );
};
