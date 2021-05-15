import React, { useEffect, useState } from 'react';
import './Input.scss';

export const Input = ({ errors, name, register, className, type }) => {
  const [classNameError, setClassNameError] = useState('');
  useEffect(() => {
    if (errors[name]?.message) {
      setClassNameError(' registration__input-error');
    } else setClassNameError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors[name]]);

  return (
    <>
      <input className={className + classNameError} type={type} {...register(name)} />
      {errors[name]?.message && (
        <div className="registration__error-wrapper">
          <span className="registration__error">{errors[name].message} </span>
        </div>
      )}
    </>
  );
};
