import React, { useState } from 'react';
import { FinishTest } from './FinishTest';
import './Test.css';
import { ActiveTest } from './ActiveTest';

const Test = () => {
  const questions = [
    {
      question: "What does mean the word 'sliphold'",
      correctAnswer: ['сливать', 'скользкая хватка'],
    },
    {
      question:
        'Many singers streamed ... online concerts for people around the world (his/it’s/your/their (1))',
      correctAnswer: ['their'],
    },
  ];

  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);

  const [currentQuestion, nextQuestion] = useState(0);

  const [isError, setError] = useState('');

  const [answer, setAnswer] = useState('');

  const [isFinished, setIsFinished] = useState(false);

  const checkIsFinished = () => {
    return currentQuestion + 1 === questions.length;
  };

  const next = () => {
    if (checkIsFinished()) {
      setIsFinished(true);
    } else {
      nextQuestion(currentQuestion + 1);
    }
    setError('');
  };

  const checkingTheCorrectAnswer = (word) => {
    console.log(questions[currentQuestion].correctAnswer[0]);
    console.log(questions[currentQuestion].correctAnswer[1]);
    for (let i = 0; i < questions[currentQuestion].correctAnswer.length; i += 1) {
      if (word === questions[currentQuestion].correctAnswer[i]) {
        console.log('сюда заходит');
        return true;
      }
    }
    return false;
  };

  const checkWords = (event) => {
    if (event.key === 'Enter') {
      if (checkingTheCorrectAnswer(event.target.value)) {
        setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
        setError('test__input-truth');
      } else {
        setError('test__input-error');
      }
      setTimeout(() => {
        next();
        setAnswer('');
      }, 1000);
    }
  };

  return (
    <div className="test">
      <div className="test__container container">
        {isFinished ? (
          <FinishTest numberOfCorrectAnswers={numberOfCorrectAnswers} />
        ) : (
          <ActiveTest
            answer={answer}
            checkWords={checkWords}
            currentQuestion={currentQuestion}
            isError={isError}
            questions={questions}
            setAnswer={setAnswer}
          />
        )}
      </div>
    </div>
  );
};

export default Test;
