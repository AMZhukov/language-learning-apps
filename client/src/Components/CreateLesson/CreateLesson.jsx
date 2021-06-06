import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import { schema } from '../../Validation/createLesson';
import { InputForReactHookForm as Input } from '../Input/InputForReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';

import 'normalize.css';
import '../basicStyle.css';
import '../SignIn/SignIn.scss';

export const CreateLesson = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  const loginHangler = async (newLesson) => {
    let response;
    try {
      response = await axios.post('/api/createLesson', { newLesson });
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container" style={{ margin: '0 auto' }}>
      <main className="sign-in">
        <h1>Вход в учётную запись</h1>
        <form onSubmit={handleSubmit(loginHangler)} className="sign-in__form">
          <div className="registration__label-wrapper">
            <label className="registration__label">
              Номер главы
              <Input
                name="headNumber"
                className="registration__input"
                type="number"
                register={register}
                errors={errors}
              />
            </label>
          </div>
          <div className="registration__label-wrapper">
            <label className="registration__label">
              Номер урока
              <Input
                name="lessonNumber"
                className="registration__input"
                type="number"
                register={register}
                errors={errors}
              />
            </label>
          </div>
          <div className="registration__label-wrapper">
            <label className="registration__label">
              Название
              <Input
                name="name"
                className="registration__input"
                type="text"
                register={register}
                errors={errors}
              />
            </label>
          </div>
          <div className="registration__label-wrapper">
            <label className="registration__label">
              Описание
              <Input
                name="description"
                className="registration__input"
                type="text"
                register={register}
                errors={errors}
              />
            </label>
          </div>
          <div className="registration__label-wrapper">
            <label className="registration__label">
              Ссылка на картинку
              <Input
                name="linkToImage"
                className="registration__input"
                type="text"
                register={register}
                errors={errors}
              />
            </label>
          </div>
          <button type="submit">Создать урок</button>
        </form>
      </main>
    </div>
  );
};
