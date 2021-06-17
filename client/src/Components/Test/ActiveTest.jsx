import React from 'react';

/* eslint-disable react/prop-types */
export const ActiveTest = ({
  questionNumber,
  isError,
  questions,
  checkWords,
  answerInput,
  buttonNewQuestion,
  nextAnswer,
  // refAnswerInput,
  /* eslint-enable react/prop-types */
}) => {
  return (
    <form onSubmit={(event) => checkWords(event)}>
      <p className="test__header">
        {questionNumber + 1}.{/* eslint-disable-next-line react/prop-types */}
        {questions[questionNumber].question}?
      </p>
      <input
        // ref={refAnswerInput}
        onChange={answerInput.onChange}
        value={answerInput.value}
        className={`test__input ${isError}`}
        type="text"
        // onBlur={(event) => checkWords(event)}
      />
      {!buttonNewQuestion && (
        <div>
          <button type="submit" className="test__button-sub">
            Ответить
          </button>
        </div>
      )}
      {buttonNewQuestion && (
        <div>
          <button onClick={nextAnswer} type="button" className="test__button-sub">
            Перейти к следующему вопросу
          </button>
        </div>
      )}
    </form>
  );
};
