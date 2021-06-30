import React from 'react';
import { FinishTestType } from './types';

export const FinishTest: React.FC<FinishTestType> = ({ numberOfCorrectAnswers, numbersQuestions }) => {
  const result: number = Math.floor((numberOfCorrectAnswers / numbersQuestions) * 100);

  const declOfNum = (number: number, titles: string[] = ['балл', 'балла', 'баллов']) => {
    // for use:  declOfNum(count, ['балл', 'балла', 'баллов']);
    const cases: number[] = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  const descriptionResult = (result: number): string => {
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
    <>
      <div className="test">
        <p className="test__p">
          Вы набрали
          {' ' + numberOfCorrectAnswers + ' ' + declOfNum(numberOfCorrectAnswers) + ' '}
          из
          {' ' + numbersQuestions}. Результат
          {' ' + result + ' '}%
        </p>
        <p className="test__p">{descriptionResult(result)}</p>
      </div>
    </>
  );
};
