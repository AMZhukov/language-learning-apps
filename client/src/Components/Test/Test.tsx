import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Header } from '../Header/Header';
import { ActiveTest } from './ActiveTest';
import { FinishTest } from './FinishTest';
import { useInput } from '../../hooks/useInput';

import { Loading } from '../Loading/Loading';
import 'normalize.css';
import '../basicStyle.css';
import './Test.scss';
import { CheckWordsType, QuesitonType } from './types';

const Test: React.FC = () => {
  const { _id } = useParams<{ _id?: string }>();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isButtonNewQuestion, setButtonNextQuestion] = useState(false);
  const [questions, setQuestions] = useState<QuesitonType[]>([]);
  const answerInput = useInput('');

  const [isError, setError] = useState('');

  const [isFinished, setIsFinished] = useState(false);

  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  useEffect(() => {
    async function responseLessonTest(): Promise<void> {
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

  const checkIsFinished = (): boolean => {
    return questionNumber + 1 === questions.length;
  };

  const nextAnswer = (): void => {
    if (checkIsFinished()) {
      setIsFinished(true);
    } else {
      setQuestionNumber((prevNumber) => prevNumber + 1);
      setButtonNextQuestion(false);
      setError('');
    }
  };

  const checkingTheCorrectAnswer = (word: string): boolean => {
    for (let i = 0; i < questions[questionNumber].variantsCorrectAnswers.length; i += 1) {
      if (word.toLowerCase().trim() === questions[questionNumber].variantsCorrectAnswers[i]) {
        return true;
      }
    }
    return false;
  };

  const checkWords: CheckWordsType = (event) => {
    event.preventDefault();
    if (checkingTheCorrectAnswer(answerInput.value)) {
      setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
      setError('test__input-truth test__input_without-outline');
    } else {
      setError('test__input-error test__input_without-outline');
    }
    setButtonNextQuestion(true);
  };

  return (
    <>
      <Header />
      <div className="test">
        <div className="indent">
          {!isFinished && (
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
                  isButtonNewQuestion={isButtonNewQuestion}
                  nextAnswer={nextAnswer}
                />
              )}
            </>
          )}
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
