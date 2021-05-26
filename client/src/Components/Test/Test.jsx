import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import 'normalize.css';

import {
  addCorrectAnswer,
  changeNumbersQuestions,
  clearNumberCorrectAnswer,
} from '../../Redux/Test/testAction';
import { ActiveTest } from './ActiveTest';
import { useInput } from '../../hooks/useInput';
import { Loading } from '../Loading/Loading';
import './Test.scss';
import '../basicStyle.css';

const Test = () => {
  const dispatch = useDispatch();
  const answerInput = useInput('');
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function request() {
      const response = await axios.get('/api/testQuestions');
      setQuestions((prev) => [...prev, ...response.data]);
    }
    setTimeout(request, 500);
    dispatch(clearNumberCorrectAnswer())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(changeNumbersQuestions(questions.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const [currentQuestion, nextQuestion] = useState(0);

  const [isError, setError] = useState('');

  const [isFinished, setIsFinished] = useState(false);

  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);

  const history = useHistory();

  useEffect(() => {
    if (isFinished) {
      history.push('/finishTest');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  const checkIsFinished = () => {
    return currentQuestion + 1 === questions.length;
  };

  const nextAnswer = () => {
    if (checkIsFinished()) {
      setIsFinished(true);
    } else {
      nextQuestion(currentQuestion + 1);
      setError('');
    }
  };

  const checkingTheCorrectAnswer = (word) => {
    for (let i = 0; i < questions[currentQuestion].correctAnswer.length; i += 1) {
      if (word === questions[currentQuestion].correctAnswer[i]) {
        return true;
      }
    }
    return false;
  };

  const checkWords = (event) => {
    event.preventDefault();
    if (checkingTheCorrectAnswer(answerInput.value)) {
      setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
      dispatch(addCorrectAnswer());
      setError('test__input-truth');
    } else {
      setNumberOfCorrectAnswers(numberOfCorrectAnswers);
      setError('test__input-error');
    }
    setTimeout(() => {
      answerInput.reset();
      nextAnswer();
    }, 1000);
  };

  return (
    <>
      <div className="test">
        <div className="test__container container">
          {questions.length === 0 ? (
            <Loading />
          ) : (
            <ActiveTest
              answerInput={answerInput}
              checkWords={checkWords}
              currentQuestion={currentQuestion}
              isError={isError}
              questions={questions}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Test;
