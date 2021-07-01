import React from 'react';
import {IQuestionRender} from "./types";

export const Quesiton: React.FC<IQuestionRender> = ({ question, index, deleteCurrentTest }) => {
  return (
    <tr key={question._id}>
      <td>{index + 1}</td>
      <td>{question.question}</td>
      <td>
        {question.variantsCorrectAnswers?.map((answer, index) => {
          return <div key={`VCA${question._id}` + index}>{answer};</div>;
        })}
      </td>
      <td>
        {question.variantsNotCorrectAnswers?.map((answer, index) => {
          return <div key={`VCNA${question._id}` + index}>{answer};</div>;
        })}
      </td>
      <td style={{ color: 'red' }}>
        <button
          title="Удалить"
          onClick={() => deleteCurrentTest(index)}
          style={{
            color: 'inherit',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
};
