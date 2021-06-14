import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './Lesson.scss';
import 'normalize.css';
import { FormNewContent } from './FormNewContent';

export const Lesson = () => {
  const idLesson = useParams();
  const [formNewContent, setFormNewContent] = useState(false);
  const [lesson1, setLesson] = useState([
    {
      tag: 'div',
      className: [],
      content: 'Изучение <strong>12312</strong> языков',
      _id: '32dfz3241aA',
    },
  ]);

  const sendDataToServer = () => {
    axios.post(`/api/lesson/${idLesson}`, lesson1);
  };

  const createContent = ({ tag: Tag, className, content, _id }) => {
    const key = _id;
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
      <div className="lesson">{lesson1.map((item) => createContent(item))}</div>
      <button onClick={newContent}>{formNewContent ? 'Отменить' : 'Добавить контент'}</button>
      <button onClick={sendDataToServer}>Сохранить изменения на сервере</button>
      <div style={{ display: `${formNewContent ? 'block' : 'none'}` }}>
        {FormNewContent({ setFormNewContent, setLesson })}
      </div>
    </div>
  );
};
