import React from 'react';
import { Quesiton } from './Question';
import { IListOfQuestions } from './types';

export const ListOfQuestions: React.FC<IListOfQuestions> = ({ questions, deleteCurrentTest }) => {
  return (
    <div className="ListOfQuestions" style={{ color: 'white', paddingTop: '100px' }}>
      <table style={{ margin: '0 auto' }}>
        <caption>Список вопросов</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Вопрос</th>
            <th>Правильный ответ</th>
            <th>Неправильный ответ</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <Quesiton
              key={`${question._id}` + index}
              deleteCurrentTest={deleteCurrentTest}
              question={question}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
