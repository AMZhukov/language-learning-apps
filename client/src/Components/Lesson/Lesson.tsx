import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import './Lesson.scss';
import '../../../node_modules/normalize.css/normalize.css';
import { Header } from '../Header/Header';
import { CreateContent, ILessonContent } from './types';

export const Lesson = () => {
  const { _id } = useParams<{ _id?: string }>();
  const [lesson, setLesson] = useState<ILessonContent[]>([]);

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

  const createContent: React.FC<CreateContent> = ({
    item: { tag: Tag, className, content, linkToImage, altToImage },
    index,
  }) => {
    const key = `${_id}` + index;
    if (Tag === 'img') {
      return (
        <div
          className={className}
          data-id={key}
          key={key}
          dangerouslySetInnerHTML={{
            __html: `<figure> <img src=${linkToImage} alt=${altToImage}> <figcaption>${content}</figcaption></figure>`,
          }}
        />
      );
    }
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
    <div className="lesson" style={{ background: 'blueviolet' }}>
      <Header />
      <div className="lesson__content">
        {lesson.map((item, index) => createContent({ item, index }))}
      </div>
      <div>
        <Link to={`/test/${_id}`} style={{ color: 'white', padding: '20px 0' }}>
          Пройти тест
        </Link>
      </div>
    </div>
  );
};