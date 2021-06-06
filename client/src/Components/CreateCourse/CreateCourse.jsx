import './CreateCourse.scss';
import { useInput } from '../../hooks/useInput';
import React from 'react';
import axios from 'axios';

export const CreateCourse = () => {
  const askInput = useInput('');
  const answerInput1 = useInput('');
  const answerInput2 = useInput('');
  const answerInput3 = useInput('');
  const answerInput4 = useInput('');

  const responseCreateTest = async (event) => {
    event.preventDefault();
    try {
      const variantsCorrectAnswers = [
        answerInput1.value,
        answerInput2.value,
        answerInput3.value,
        answerInput4.value,
      ];
      const filteredVariantsCorrectAnswers = variantsCorrectAnswers.filter((item) => {
        return item !== '';
      });
      console.log(filteredVariantsCorrectAnswers);
      const response = await axios.post('/api/createTestQuestion', {
        question: askInput.value,
        variantsCorrectAnswers: filteredVariantsCorrectAnswers,
      });
      console.log(response);
      askInput.reset();
      answerInput1.reset();
      answerInput2.reset();
      answerInput3.reset();
      answerInput4.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="create-course" onSubmit={(event) => responseCreateTest(event)}>
      <div className="wrapper">
        <label className="" style={{ color: 'white' }}>
          Вопрос
          <input
            onChange={askInput.onChange}
            value={askInput.value}
            className={`test__input`}
            type="text"
          />
        </label>
      </div>
      <div className="wrapper">
        <label className="" style={{ color: 'white' }}>
          Вариант ответа 1
          <input
            onChange={answerInput1.onChange}
            value={answerInput1.value}
            className={`test__input`}
            type="text"
          />
        </label>
      </div>
      <div className="wrapper">
        <label className="" style={{ color: 'white' }}>
          Вариант ответа 2
          <input
            onChange={answerInput2.onChange}
            value={answerInput2.value}
            className={`test__input`}
            type="text"
          />
        </label>
      </div>
      <div className="wrapper">
        <label className="" style={{ color: 'white' }}>
          Вариант ответа 3
          <input
            onChange={answerInput3.onChange}
            value={answerInput3.value}
            className={`test__input`}
            type="text"
          />
        </label>
      </div>
      <div className="wrapper">
        <label className="" style={{ color: 'white' }}>
          Вариант ответа 4
          <input
            onChange={answerInput4.onChange}
            value={answerInput4.value}
            className={`test__input`}
            type="text"
          />
        </label>
      </div>
      <button type="submit" style={{ color: 'white', width: '100px', background: 'black' }}>
        Отправить
      </button>
    </form>
  );
};
