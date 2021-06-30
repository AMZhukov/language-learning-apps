import React, { useEffect, useState } from 'react';
import './InputForReactHookForm.scss';
import { useInput } from '../../hooks/useInput';
import {
  SelectForReactHookFormType,
  CustomUniversalInputForReactHookFormType,
  TextareaForReactHookFormType,
  InputForReactHookFormType,
} from './types';

const CustomUniversalInputForReactHookForm = ({
  tag,
  errors,
  name,
  register,
  className,
  value = '',
  style,
  size = 1,
  options,
  type,
  setCurrentValue,
}: CustomUniversalInputForReactHookFormType) => {
  let typeSelect: boolean = false;
  let typeInput: boolean = false;
  let typeTextarea: boolean = false;
  // eslint-disable-next-line default-case
  switch (tag) {
    case 'select':
      typeSelect = true;
      break;
    case 'input':
      typeInput = true;
      break;
    case 'textarea':
      typeTextarea = true;
      break;
  }

  const [classNameError, setClassNameError] = useState('');
  const customInput = useInput(value);
  useEffect(() => {
    if (errors[name]?.message) {
      setClassNameError(' input__input-error');
    } else setClassNameError('');
  }, [errors[name]]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    typeSelect && setCurrentValue && setCurrentValue(customInput.value);
  }, [customInput.value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {typeInput && (
        <input
          key={name}
          className={'input__input ' + className + classNameError}
          type={type}
          {...register(name)}
          style={style}
        />
      )}
      {typeSelect && (
        <select
          key={name}
          className={'input__input ' + className + classNameError}
          {...register(name)}
          onChange={customInput.onChange}
          value={customInput.value}
          style={style}
          size={size}
        >
          {options &&
            options.map((option) => {
              return <option value={option.value}>{option.name}</option>;
            })}
        </select>
      )}
      {typeTextarea && (
        <textarea
          key={name}
          className={'input__input ' + className + classNameError}
          {...register(name)}
          onChange={customInput.onChange}
          value={customInput.value}
          style={style}
        />
      )}

      {errors[name]?.message && (
        <div className="input__error-wrapper">
          <span className="input__error">{errors[name].message} </span>
        </div>
      )}
    </>
  );
};

export const SelectForReactHookForm = ({
  errors,
  name,
  register,
  className,
  value,
  style,
  size,
  options,
  setCurrentValue,
}: SelectForReactHookFormType) => {
  return CustomUniversalInputForReactHookForm({
    tag: 'select',
    errors,
    name,
    register,
    className,
    value,
    style,
    size,
    options,
    setCurrentValue,
  });
};

export const TextareaForReactHookForm = ({
  errors,
  name,
  register,
  className,
  value,
  style,
  setCurrentValue,
}: TextareaForReactHookFormType) => {
  return CustomUniversalInputForReactHookForm({
    tag: 'textarea',
    errors,
    name,
    register,
    className,
    value,
    style,
    setCurrentValue,
  });
};

export const InputForReactHookForm = ({
  errors,
  name,
  register,
  className,
  type,
  value = '',
  style,
  setCurrentValue,
}: InputForReactHookFormType) => {
  return CustomUniversalInputForReactHookForm({
    tag: 'input',
    errors,
    name,
    register,
    className,
    value,
    style,
    type,
    setCurrentValue,
  });
};
