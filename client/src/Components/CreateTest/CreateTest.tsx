import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import { useInput } from '../../hooks/useInput';
import './CreateTest.scss';
import { ListOfQuestions } from './ListOfQuestions';
import { IQuestion } from './types';

export const CreateTest: React.FC = () => {
  const { _id } = useParams<{ _id?: string }>();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isPut, setIsPut] = useState(false);
  const [goCreate, setGoCreate] = useState(false);

  useEffect(() => {
    (async function responseLessonTest() {
      try {
        const { data } = await axios.get(`/api/testQuestions/${_id}`);
        if (data) {
          setIsPut(true);
          setQuestions((prevState) => {
            return [...prevState, ...data.questions];
          });
        }
        setGoCreate(true);
      } catch (error) {
        console.log(error.response.data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const askInput = useInput('');
  const answerInput1 = useInput('');
  const answerInput2 = useInput('');
  const answerInput3 = useInput('');
  const answerInput4 = useInput('');
  const _idInput = useInput('');

  const sendDataToServer = async () => {
    try {
      !isPut &&
        (await axios.post(`/api/createTestQuestion/${_id}`, {
          _id: _idInput.value,
          questions,
        }));
      isPut &&
        (await axios.put(`/api/createTestQuestion/${_id}`, {
          _id: _idInput.value,
          questions,
        }));
    } catch (error) {
      console.log(error.data.response);
    }
  };

  const responseCreateTest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const variantsCorrectAnswers = [
      answerInput1.value,
      answerInput2.value,
      answerInput3.value,
      answerInput4.value,
    ];
    const filteredVariantsCorrectAnswers = variantsCorrectAnswers.filter((item) => {
      return item !== '';
    });
    if (filteredVariantsCorrectAnswers.length === 0 || !askInput.value) {
      return false;
    }
    setQuestions((prevState) => {
      return [
        ...prevState,
        {
          question: askInput.value,
          variantsCorrectAnswers: filteredVariantsCorrectAnswers,
          variantsNotCorrectAnswers: [],
        },
      ];
    });
    _idInput.reset();
    askInput.reset();
    answerInput1.reset();
    answerInput2.reset();
    answerInput3.reset();
    answerInput4.reset();
  };

  const deleteCurrentTest = (indexItem: number) => {
    setQuestions((prevState) => {
      return [...prevState.filter((_, index) => index !== indexItem)];
    });
  };

  return (
    <>
      {!!questions.length && (
        <div className="indent">
          <ListOfQuestions questions={questions} deleteCurrentTest={deleteCurrentTest} />
        </div>
      )}
      {goCreate && (
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
          <input
            type="text"
            onChange={_idInput.onChange}
            value={_idInput.value}
            style={{ display: 'none' }}
          />
          <button
            type="submit"
            style={{ color: 'white', width: '100px', background: 'black', marginBottom: '20px' }}
          >
            Создать
          </button>
          <button
            onClick={sendDataToServer}
            style={{ color: 'white', width: '280px', background: 'black', marginBottom: '20px' }}
          >
            Отправить данные на сервер
          </button>
          <Link style={{ color: 'white' }} to={`/`}>
            Завершить редактирование
          </Link>
        </form>
      )}
    </>
  );
};
