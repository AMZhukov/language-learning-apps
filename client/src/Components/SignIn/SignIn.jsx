import React from 'react';
import './SignIn.scss';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import { useForm } from 'react-hook-form';

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const logIn = () => {
    console.log('Log In');
  };

  return (
    <main>
      <div className="registration__logo-wrapper" role="banner">
        <Link to="/">
          <img src={logo} className="registration__logo" alt="logo" />
        </Link>
      </div>
      <h1>Вход в учётную запись</h1>
      <form onSubmit={handleSubmit(logIn)} className="sign-in__form">

      </form>
    </main>
  );
};
