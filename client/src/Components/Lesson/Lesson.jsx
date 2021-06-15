import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './Lesson.scss';
import 'normalize.css';
import { FormNewContent } from './FormNewContent';

export const Lesson = () => {
  const { _id } = useParams();
  const [formNewContent, setFormNewContent] = useState(false);
  const [lesson1, setLesson] = useState([]);
  const [isPut, setIsPut] = useState(false);
  const [goCreate, setGoCreate] = useState(false);

  useEffect(() => {
    (async function responseContentLesson() {
      try {
        const { data } = await axios.get(`/api/lesson/${_id}`);
        if (data) {
          setIsPut(true);
          setLesson((prevState) => {
            return [...prevState, ...data.content];
          });
        }
        setGoCreate(true);
      } catch (error) {
        console.log(error.response.data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendDataToServer = () => {
    (async function () {
      try {
        !isPut && (await axios.post(`/api/lesson/${_id}`, { content: lesson1 }));
        isPut && (await axios.put(`/api/lesson/${_id}`, { content: lesson1 }));

        !isPut && setIsPut(true);
        console.log('Данные успешно отправлены');
      } catch (error) {
        console.log(error.response.data);
      }
    })();
  };

  const createContent = ({ tag: Tag, className, content }, index) => {
    const key = `${_id}` + index;
    return (
      <Tag
        className={className}
        data-id={key}
        key={key}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  const newContent = () => {
    setFormNewContent((prevState) => !prevState);
  };

  return (
    <div style={{ padding: '150px', background: 'blueviolet' }}>
      {/*<div dangerouslySetInnerHTML={{ __html: yourhtml }} />*/}
      <div className="lesson">{lesson1.map((item, index) => createContent(item, index))}</div>
      {goCreate && (
        <>
          <button onClick={newContent}>{formNewContent ? 'Отменить' : 'Добавить контент'}</button>
          <button onClick={sendDataToServer}>Сохранить изменения на сервере</button>
        </>
      )}
      <div style={{ display: `${formNewContent ? 'block' : 'none'}` }}>
        {FormNewContent({ setFormNewContent, setLesson })}
      </div>
    </div>
  );
};
