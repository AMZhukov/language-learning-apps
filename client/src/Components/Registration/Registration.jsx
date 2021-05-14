import React, { useState } from 'react';
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
  string:{
    /* eslint-disable no-template-curly-in-string */
    min: 'Минимальное количество символов ${min}',
    max: 'Максимальное количество символов ${min}',
    /* eslint-enable no-template-curly-in-string */
  }
})

const schema = yup.object().shape({
  Username: yup.string().min(4).max(6).required('First Name should be required please'),
  // lastName: yup.string().required(),
  // email: yup.string().email().required(),
  // age: yup.number().positive().integer().required(),
  // password: yup.string().min(4).max(15).required(),
  // confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const registration = async (event) => {
    try {
      // const response = await axios.post('/api/registration', { username });
      alert(123);
    } catch (error) {
      console.log(error);
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
              name="Username"
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
            <input className="registration__input" type="email" {...register('email')} />
          </label>
        </div>
        <div className="registration__label-wrapper">
          <label>
            Password
            <input className="registration__input" type="password" {...register('password')} />
          </label>
        </div>
        <button type="submit">Регистрация</button>
      </form>
    </main>
  );
};
