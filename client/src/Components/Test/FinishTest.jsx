import React from 'react';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
export const FinishTest = () => {
  const numberOfCorrectAnswers = useSelector((store) => {
    return store.test.numberOfCorrectAnswers;
  });
  const numbersQuestions = useSelector((store) => {
    return store.test.numbersQuestions;
  });
  const result = Math.floor((numberOfCorrectAnswers / numbersQuestions) * 100);

  const descriptionResult = (result) => {
    if (result < 30) {
      return 'Ваши результаты плачевны. У Вас много работы впереди! Начинайте с самого начала';
    } else if (result < 60) {
      return 'Неплохо. Хорошее начало — половина дела! Начните изучение на среднем уровне сложности!';
    } else {
      return (
        'А Вы не так прост, как может показаться на первый взгляд! ' +
        'Предлагаем Вам заняться изучением материала посложнее!'
      );
    }
  };

  return (
    <div className="test">
      <p className="test__header">
        Вы набрали &nbsp;
        {numberOfCorrectAnswers}
        &nbsp; баллов из &nbsp;
        {numbersQuestions}. Результат &nbsp;
        {result}
        &nbsp; %
      </p>
      <p className="test__header">{descriptionResult(result)}</p>
    </div>
  );
};
