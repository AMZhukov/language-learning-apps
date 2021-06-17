import React from 'react';
import { Quesiton } from './Question';

export const ListOfQuestions = ({ questions, deleteCurrentTest }) => {
  return (
    <div className="ListOfQuestions" style={{ color: 'white', paddingTop: '100px' }}>
      <table style={{ margin: '0 auto' }}>
        <caption>Список вопросов</caption>
        <tr>
          <th>#</th>
          <th>Вопрос</th>
          <th>Правильный ответ</th>
          <th>Неправильный ответ</th>
          <th>Удалить</th>
        </tr>
        {questions.map((question, index) => (
          <Quesiton
            key={question._id}
            deleteCurrentTest={deleteCurrentTest}
            question={question}
            index={index}
          />
        ))}
      </table>
    </div>
  );
};
