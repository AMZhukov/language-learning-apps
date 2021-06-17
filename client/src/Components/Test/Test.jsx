import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'normalize.css';

import { ActiveTest } from './ActiveTest';
import { FinishTest } from './FinishTest';
import { useInput } from '../../hooks/useInput';
import { Loading } from '../Loading/Loading';
import './Test.scss';
import '../basicStyle.css';
import { useParams } from 'react-router-dom';

const Test = () => {
  const { _id } = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [buttonNewQuestion, setButtonNextQuestion] = useState(false);
  const [questions, setQuestions] = useState([]);
  const answerInput = useInput('');

  const [isError, setError] = useState('');

  const [isFinished, setIsFinished] = useState(false);

  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  console.log(questions);
  useEffect(() => {
    async function responseLessonTest() {
      try {
        const { data } = await axios.get(`/api/testQuestions/${_id}`);
        if (data) {
          setQuestions((prevState) => {
            return [...prevState, ...data.questions];
          });
        }
      } catch (error) {
        console.log(error.response.data);
      }
    }
    setTimeout(responseLessonTest, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIsFinished = () => {
    return questionNumber + 1 === questions.length;
  };

  const nextAnswer = async () => {
    if (checkIsFinished()) {
      try {
        await axios.post(`/api/testQuestions/${_id}`);
      } catch (error) {
        console.log(error.response.data);
      }
      setIsFinished(true);
    } else {
      setQuestionNumber((prevNumber) => prevNumber + 1);
      setButtonNextQuestion(false);
      setError('');
    }
  };

  const checkingTheCorrectAnswer = (word) => {
    for (let i = 0; i < questions[questionNumber].variantsCorrectAnswers.length; i += 1) {
      if (word.toLowerCase().trim() === questions[questionNumber].variantsCorrectAnswers[i]) {
        return true;
      }
    }
    return false;
  };

  const checkWords = (event) => {
    event.preventDefault();
    if (checkingTheCorrectAnswer(answerInput.value)) {
      setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
      setError('test__input-truth');
    } else {
      setError('test__input-error');
    }
    setButtonNextQuestion(true);
  };

  return (
    <>
      <div className="test">
        <div className="test__container container">
          {
            !isFinished && (
              <>
                {' '}
                {questions.length === 0 ? (
                  <Loading />
                ) : (
                  <ActiveTest
                    answerInput={answerInput}
                    checkWords={checkWords}
                    questionNumber={questionNumber}
                    isError={isError}
                    questions={questions}
                    buttonNewQuestion={buttonNewQuestion}
                    nextAnswer={nextAnswer}
                  />
                )}
              </>
            )
          }
          {isFinished && (
            <FinishTest
              numberOfCorrectAnswers={numberOfCorrectAnswers}
              numbersQuestions={questions.length}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Test;
