import React, { useEffect, useState } from 'react';
import './InputForReactHookForm.scss';
import { useInput } from '../../hooks/useInput';

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
}) => {
  let typeSelect = false;
  let typeInput = false;
  let typeTextarea = false;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors[name]]);

  useEffect(() => {
      typeSelect && setCurrentValue(customInput.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customInput.value]);

  return (
    <>
      {typeInput && (
        <input
          name={name}
          className={'input__input ' + className + classNameError}
          type={type}
          {...register(name)}
          // onChange={customInput.onChange}
          // value={customInput.value}
          style={style}
        />
      )}
      {typeTextarea && (
        <textarea
          name={name}
          className={'input__input ' + className + classNameError}
          {...register(name)}
          onChange={customInput.onChange}
          value={customInput.value}
          style={style}
        />
      )}
      {typeSelect && (
        <select
          name={name}
          className={'input__input ' + className + classNameError}
          {...register(name)}
          onChange={customInput.onChange}
          value={customInput.value}
          style={style}
          size={size}
        >
          {options.map((option) => {
            return <option value={option.value}>{option.name}</option>;
          })}
        </select>
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
}) => {
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
}) => {
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
}) => {
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
