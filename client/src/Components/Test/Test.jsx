import React, { useState } from 'react';
import './Test.css';

const Test = () => {
  // let error = "test__input-error";

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

  const [currentQuestion, nextQuestion] = useState(0);

  const [isError, setError] = useState('');

  const next = () => {
    if (questions.lenght === currentQuestion + 1) {
      nextQuestion(currentQuestion);
    } else {
      nextQuestion(currentQuestion + 1);
    }
    setError('');
  };

  const checkWords = (e) => {
    if (e.key !== 'Enter') {
      setError((prev) => prev);
    } else {
      if (e.target.value === questions[currentQuestion].correctAnswer) {
        setError('test__input-truth');
        setTimeout(() => {}, 0);
      } else {
        setError('test__input-error');
      }
      setTimeout(() => {
        next();
        e.target.value = '';
      }, 1500);
    }
  };

  return (
    <div className="test">
      <div className="test__container container">
        <p className="test__header">
          {currentQuestion}
          .
          {questions[currentQuestion].question}
          ?
        </p>
        <input className={`test__input ${isError}`} type="text" onKeyPress={(e) => checkWords(e)} />
      </div>
    </div>
  );
};

// const Test123 = (props) => (
//   <div className="test">
//     <p className="test__header">
//       Вы набрали
//       {props.scores}
//     </p>
//   </div>
// );

export default Test;
