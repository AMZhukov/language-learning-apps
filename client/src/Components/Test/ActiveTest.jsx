import React from 'react';

/* eslint-disable react/prop-types */
export const ActiveTest = ({
  answer,
  checkWords,
  currentQuestion,
  isError,
  questions,
  setAnswer,
/* eslint-enable react/prop-types */
}) => {
  return (
    <>
      <p className="test__header">
        {currentQuestion + 1}
        .
        {/* eslint-disable-next-line react/prop-types */}
        {questions[currentQuestion].question}
        ?
      </p>
      <input
        className={`test__input ${isError}`}
        type="text"
        onChange={(event) => {
          return setAnswer(event.target.value);
        }}
        onKeyPress={(event) => {
          return checkWords(event);
        }}
        value={answer}
      />
    </>
  );
};
