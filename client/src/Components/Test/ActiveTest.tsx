import React from 'react';

import 'normalize.css';
import '../basicStyle.css';
import { ActiveTestType } from './types';

export const ActiveTest: React.FC<ActiveTestType> = ({
  questionNumber,
  isError,
  questions,
  checkWords,
  answerInput,
  buttonNewQuestion,
  nextAnswer,
}) => {
  return (
    <>
      <form onSubmit={(event) => checkWords(event)} className="test__form">
        <div className="test__form-container">
          <p className="test__p">
            Вопрос {questionNumber + 1} из {questions.length}
          </p>
          <p className="test__p">{questions[questionNumber].question}</p>
          <div className="test__input-wrapper">
            <input
              onChange={answerInput.onChange}
              value={answerInput.value}
              className={`test__input ${isError}`}
              type="text"
            />
          </div>
          {!buttonNewQuestion && (
            <div>
              <button type="submit" className="test__button">
                Проверить
              </button>
            </div>
          )}
          {buttonNewQuestion && (
            <div>
              <button onClick={nextAnswer} type="button" className="test__button">
                Перейти к следующему вопросу
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
};
