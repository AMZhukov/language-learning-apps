import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { schema } from '../../Validation/createLesson';
import { InputForReactHookForm as Input } from '../Input/CustomUniversalInputForReactHookForm.jsx';

import 'normalize.css';
import '../basicStyle.css';
import '../SignIn/SignIn.scss';

export const CreateLesson = () => {
  const { _id } = useParams();
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
          console.log(data);
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

  const createOrEditLesson = async (newLesson) => {
    console.log(newLesson);
    try {
      if (isCreateLesson) {
        await axios.post('/api/createLesson', { newLesson });
      } else {
        await axios.put('/api/editLesson', { newLesson });
        setTimeout(() => {
          history.push(`/createTest/${_id}`);
        }, 2000);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container" style={{ margin: '0 auto', paddingTop: '100px' }}>
      <main className="sign-in">
        <h1>{isCreateLesson ? 'Создание нового урока' : 'Редактирование урока'}</h1>
        <form onSubmit={handleSubmit(createOrEditLesson)} className="sign-in__form">
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
          <Input
            name="_id"
            className="registration__input registration__input_invisible"
            type="text"
            register={register}
            errors={errors}
          />
          <button type="submit">{isCreateLesson ? 'Создать урок' : 'Сохранить изменения'}</button>

          <div style={{ paddingTop: '20px' }}>
            <Link style={{ color: 'white' }} to={`/createLessonContent/${_id}`}>
              Редактировать контент лекции
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};
