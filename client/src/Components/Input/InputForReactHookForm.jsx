import React, { useEffect, useState } from 'react';
import './InputForReactHookForm.scss';
import { useInput } from '../../hooks/useInput';

export const InputForReactHookForm = ({ errors, name, register, className, type, value = '', style }) => {
  const [classNameError, setClassNameError] = useState('');
  const customInput = useInput(value);
  useEffect(() => {
    if (errors[name]?.message) {
      setClassNameError(' input__input-error');
    } else setClassNameError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors[name]]);


  return (
    <>
      <input
        className={'input__input ' + className + classNameError}
        type={type}
        {...register(name)}
        onChange={customInput.onChange}
        value={customInput.value}
        style={style}
      />
      {errors[name]?.message && (
        <div className="input__error-wrapper">
          <span className="input__error">{errors[name].message} </span>
        </div>
      )}
    </>
  );
};
