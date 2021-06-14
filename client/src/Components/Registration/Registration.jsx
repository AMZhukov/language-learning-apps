import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { setUserAction } from '../../Redux/login/userAction';
import { schema } from '../../Validation/registration';

import { InputForReactHookForm as Input } from '../Input/CustomUniversalInputForReactHookForm.jsx';
import { LogoLink } from '../LogoLink/LogoLink';

import 'normalize.css';
import '../../layout.css';

import './Registration.scss';

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
    <main className="registration">
      <LogoLink />
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
            />
          </label>
        </div>
        <button type="submit">Регистрация</button>
      </form>
    </main>
  );
};
