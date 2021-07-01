import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../Validation/createContentLesson.js';
import { TextareaForReactHookForm as Textarea } from '../Input/CustomUniversalInputForReactHookForm';
import { SelectForReactHookForm as Select } from '../Input/CustomUniversalInputForReactHookForm';
import { InputForReactHookForm as Input } from '../Input/CustomUniversalInputForReactHookForm';
import './LessonNewContent.scss';
import { IFormNewContent, ILessonContent } from './types';

export const FormNewContent: React.FC<IFormNewContent> = ({ setFormNewContent, setLesson }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });

  // this hook for implement to add field input for link to image
  const [currentValue, setCurrentValue] = useState('');
  useEffect(() => {
    if (currentValue !== 'image') {
      setValue('linkToImage', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);
  const submit = async (registrationData: ILessonContent): Promise<void> => {
    try {
      console.log(registrationData);
      setFormNewContent(false);
      setLesson((prevState) => {
        return [...prevState, { ...registrationData }];
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const options = [
    { name: 'div', value: 'div' },
    { name: 'image', value: 'img' },
    { name: 'p', value: 'p' },
    { name: 'h1', value: 'h1' },
    { name: 'h2', value: 'h2' },
    { name: 'h3', value: 'h3' },
    { name: 'h4', value: 'h4' },
    { name: 'h5', value: 'h5' },
    { name: 'h6', value: 'h6' },
  ];

  return (
    <main className="registration">
      <h1>Новый контент</h1>
      <form onSubmit={handleSubmit(submit)} className="registration__form">
        <div className="registration__label-wrapper">
          <label className="registration__label">
            Тег
            <Select
              className="registration__input"
              name="tag"
              register={register}
              errors={errors}
              options={options}
              setCurrentValue={setCurrentValue}
            />
          </label>
        </div>

        <div className="registration__label-wrapper">
          <label>
            {currentValue === 'image' ? 'Подпись к рисунку' : 'Контент'}
            <Textarea
              className="registration__input"
              name="content"
              register={register}
              errors={errors}
              setCurrentValue={setCurrentValue}
            />
          </label>
        </div>
        <div
          className="registration__label-wrapper"
          style={{ display: currentValue === 'image' ? 'block' : 'none' }}
        >
          <label>
            linkToImage
            <Input
              className="registration__input"
              name="linkToImage"
              register={register}
              errors={errors}
              type="type"
              setCurrentValue={setCurrentValue}
            />
          </label>
        </div>
        <button type="submit">Создать</button>
      </form>
    </main>
  );
};
