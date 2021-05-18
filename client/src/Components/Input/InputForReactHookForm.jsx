import React, { useEffect, useState } from 'react';
import './InputForReactHookForm.scss';

export const InputForReactHookForm = ({ errors, name, register, className, type }) => {
  const [classNameError, setClassNameError] = useState('');
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
      />
      {errors[name]?.message && (
        <div className="input__error-wrapper">
          <span className="input__error">{errors[name].message} </span>
        </div>
      )}
    </>
  );
};
