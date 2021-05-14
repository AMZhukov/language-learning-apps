import React, { useEffect, useState } from 'react';
import './Input.scss';

export const Input = (props) => {
  const [textError, setTextError] = useState('');
  const error = props.errors[props.name];
  useEffect(() => {
    if (error?.message) {
      setTextError(error.message);
    } else {
      setTextError('');
    }
  }, [error]);

  return (
    <>
      <input className={props.className} type={props.type} {...props.register(props.name)} />
      {props.errors[props.name] && (
        <div className="registration__error-wrapper">
          <span className="registration__error">{textError}</span>
        </div>
      )}
    </>
  );
};
