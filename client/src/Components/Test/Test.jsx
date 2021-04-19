import React, { useState } from 'react';
import './Test.css';

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

  const [currentQuestion, nextQuestion] = useState(0);

  const [isError, setError] = useState('');

  const [answer, setAnswer] = useState('');

  const next = () => {
    if (currentQuestion + 1 < questions.length) {
      nextQuestion(currentQuestion + 1);
    } else {
      nextQuestion(currentQuestion);
    }
    setError('');
  };

  const checkWords = (eer) => {
    if (eer.key === 'Enter') {
      if (eer.target.value === questions[currentQuestion].correctAnswer[0]) {
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
        <p className="test__header">
          {currentQuestion + 1}
          .
          {questions[currentQuestion].question}
          ?
        </p>
        <input
          className={`test__input ${isError}`}
          type="text"
          onChange={(e) => setAnswer(e.target.value)}
          onKeyPress={(e) => checkWords(e)}
          value={answer}
        />
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
