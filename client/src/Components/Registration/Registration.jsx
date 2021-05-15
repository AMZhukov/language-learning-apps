import React from 'react';
import { useInput } from '../../hooks/useInput';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../Input/Input';
import 'normalize.css';
import '../../layout.css';

import './Registration.scss';
import logo from '../../logo.svg';

yup.setLocale({
  string: {
    /* eslint-disable no-template-curly-in-string */
    min: 'Минимальное количество символов ${min}',
    max: 'Максимальное количество символов ${max}',
    /* eslint-enable no-template-curly-in-string */
  },
});

const schema = yup.object().shape({
  username: yup.string().required().max(15),
  email: yup.string().email().required().max(30),
  password: yup.string().min(4).max(15).required(),
});

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' });

  const registration = async (registrationData) => {
    try {
      const response = await axios.post('/api/registration', { registrationData });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <main className="registration">
      <div className="registration__logo-wrapper" role="banner">
        <Link to="/">
          <img src={logo} className="registration__logo" alt="logo" />
        </Link>
      </div>
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit(registration)} className="registration__form">
        <div className="registration__label-wrapper">
          <label className="registration__label">
            Username
            <Input
              name="username"
              className="registration__input"
              type="text"
              register={register}
              errors={errors}
              schema={schema}
            />
          </label>
        </div>
        <div className="registration__label-wrapper">
          <label>
            Email
            <Input
              className="registration__input"
              name="email"
              type="email"
              register={register}
              errors={errors}
              schema={schema}
            />
          </label>
        </div>
        <div className="registration__label-wrapper">
          <label>
            Password
            <Input
              className="registration__input"
              name="password"
              type="password"
              register={register}
              errors={errors}
              schema={schema}
            />
          </label>
        </div>
        <button type="submit">Регистрация</button>
      </form>
    </main>
  );
};
