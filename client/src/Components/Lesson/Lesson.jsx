import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import './Lesson.scss';
import '../../../node_modules/normalize.css/normalize.css';

export const Lesson = () => {
  const { _id } = useParams();
  const [lesson1, setLesson] = useState([]);

  useEffect(() => {
    (async function responseContentLesson() {
      try {
        const { data } = await axios.get(`/api/lessonContent/${_id}`);
        if (data) {
          setLesson((prevState) => {
            return [...prevState, ...data.content];
          });
        }
      } catch (error) {
        console.log(error.response.data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div style={{ padding: '150px', background: 'blueviolet' }}>
      <div className="lesson">{lesson1.map((item, index) => createContent(item, index))}</div>
      <div style={{ paddingTop: '40px'}}>
        <Link to={`/test/${_id}`} style={{ color: 'white' }}>
          Пройти тест
        </Link>
      </div>
    </div>
  );
};
