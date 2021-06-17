import React from 'react';

export const FinishTest = ({numberOfCorrectAnswers, numbersQuestions}) => {

  const result = Math.floor((numberOfCorrectAnswers / numbersQuestions) * 100);

  const descriptionResult = (result) => {
    if (result < 30) {
      return 'Ваши результаты плачевны. У Вас много работы впереди! Начинайте с самого начала';
    } else if (result < 85) {
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
        Вы набрали
        {' ' + numberOfCorrectAnswers + ' '}
        баллов из
        {' ' + numbersQuestions + ' '}
        . Результат
        {' ' + result + ' '}
        %
      </p>
      <p className="test__header">{descriptionResult(result)}</p>
    </div>
  );
};
