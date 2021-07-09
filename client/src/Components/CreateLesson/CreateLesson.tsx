import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { schema } from '../../Validation/createLesson';
import { InputForReactHookForm as Input } from '../Input/CustomUniversalInputForReactHookForm';

import 'normalize.css';
import '../basicStyle.css';
import '../SignIn&SignUp/SignIn&SignUp.scss';
import { ILesson } from './types';

export const CreateLesson = () => {
  const { _id } = useParams<{ _id?: string }>();
  const history = useHistory();
  const [isCreateLesson, setIsCreateLesson] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  useEffect(() => {
    if (_id) {
      setIsCreateLesson(false);
      (async function () {
        try {
          const { data } = await axios.get(`/api/lesson/${_id}`);
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              setValue(key, data[key]);
            }
          }
        } catch (error) {
          console.log(error.response.data);
        }
      })();
    }
  }, [_id, setValue]);

  const createOrEditLesson = async (newLesson: ILesson): Promise<void> => {
    try {
      if (isCreateLesson) {
        const { data } = await axios.post('/api/createLesson', { newLesson });
        setTimeout(() => {
          history.push(`/editLesson/${data.newId}`);
        }, 2000);
      } else {
        await axios.put('/api/editLesson', { newLesson });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container" style={{ color: 'white', margin: '0 auto', paddingTop: '100px' }}>
      <main className="sign-in-sign-up">
        <h1>{isCreateLesson ? 'Создание нового урока' : 'Редактирование урока'}</h1>
        <form onSubmit={handleSubmit(createOrEditLesson)} className="sign-in-sign-up__form">
          <div className="form__label-wrapper">
            <label className="form__label">
              Номер главы
              <Input
                name="headNumber"
                className="form__input"
                type="number"
                register={register}
                errors={errors}
              />
            </label>
          </div>
          <div className="form__label-wrapper">
            <label className="form__label">
              Номер урока
              <Input
                name="lessonNumber"
                className="form__input"
                type="number"
                register={register}
                errors={errors}
              />
            </label>
          </div>
          <div className="form__label-wrapper">
            <label className="form__label">
              Название
              <Input
                name="name"
                className="form__input"
                type="text"
                register={register}
                errors={errors}
              />
            </label>
          </div>
          <div className="form__label-wrapper">
            <label className="form__label">
              Описание
              <Input
                name="description"
                className="form__input"
                type="text"
                register={register}
                errors={errors}
              />
            </label>
          </div>
          <div className="form__label-wrapper">
            <label className="form__label">
              Ссылка на картинку
              <Input
                name="linkToImage"
                className="form__input"
                type="text"
                register={register}
                errors={errors}
              />
            </label>
          </div>
          <Input
            name="_id"
            className="form__input form__input_invisible"
            type="text"
            register={register}
            errors={errors}
          />
          <button
            style={{ color: 'white', width: '280px', background: 'black', marginBottom: '20px' }}
            type="submit"
          >
            {isCreateLesson ? 'Создать урок' : 'Сохранить изменения'}
          </button>

          {!isCreateLesson && (
            <div style={{ paddingTop: '20px' }}>
              <Link style={{ color: 'white' }} to={`/createLessonContent/${_id}`}>
                Редактировать контент лекции
              </Link>
            </div>
          )}
        </form>
      </main>
    </div>
  );
};
