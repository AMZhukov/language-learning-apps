import React from 'react';

// eslint-disable-next-line react/prop-types
export const FinishTest = ({ numberOfCorrectAnswers }) => {
  return (
    <div className="test">
      <p className="test__header">
        Вы набрали &nbsp;
        {numberOfCorrectAnswers}
        &nbsp; баллов
      </p>
    </div>
  );
};
