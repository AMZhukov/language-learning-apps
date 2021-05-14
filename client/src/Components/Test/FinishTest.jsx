import React from 'react';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
export const FinishTest = () => {
  const numberOfCorrectAnswers = useSelector((store) => {
    return store.test.numberOfCorrectAnswers;
  });
  return (
    <div className='test'>
      <p className='test__header'>
        Вы набрали &nbsp;
        {numberOfCorrectAnswers}
        &nbsp; баллов
      </p>
    </div>
  );
};
