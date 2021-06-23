import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { setUserAction } from '../../Redux/login/userAction';
import { schema } from '../../Validation/registration';

import { InputForReactHookForm as Input } from '../Input/CustomUniversalInputForReactHookForm.jsx';
import { LogoLink } from '../LogoLink/LogoLink';

import 'normalize.css';
import '../../layout.css';

import './SignIn&SignUp.scss';
import '../Form/Form.scss';

export const Registration = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' });

  const registration = async (registrationData) => {
    try {
      const response = await axios.post('/api/registration', { registrationData });
      dispatch(setUserAction(response.data.userId, response.data.token));
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
        <form onSubmit={handleSubmit(registration)} className="form">
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
