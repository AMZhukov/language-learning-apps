import React from 'react';

/* eslint-disable react/prop-types */
export const ActiveTest = ({
  currentQuestion,
  isError,
  questions,
  checkWords,
  answerInput,
  // refAnswerInput,
  /* eslint-enable react/prop-types */
}) => {
  return (
    <form onSubmit={(event) => checkWords(event)}>
      <p className="test__header">
        {currentQuestion + 1}.{/* eslint-disable-next-line react/prop-types */}
        {questions[currentQuestion].question}?
      </p>
      <input
        // ref={refAnswerInput}
        onChange={answerInput.onChange}
        value={answerInput.value}
        className={`test__input ${isError}`}
        type="text"
        // onBlur={(event) => checkWords(event)}
      />
      <button type="submit" className="test__button-sub" />
    </form>
  );
};
