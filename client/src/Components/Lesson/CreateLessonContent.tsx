import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import './Lesson.scss';
import 'normalize.css';
import { FormNewContent } from './FormNewContent';
import { CreateContent, ILessonContent } from './types';

export const CreateLessonContent = () => {
  const { _id } = useParams<{ _id?: string }>();
  const [formNewContent, setFormNewContent] = useState(false);
  const [lesson, setLesson] = useState<ILessonContent[]>([]);
  const [isPut, setIsPut] = useState(false);
  const [goCreate, setGoCreate] = useState(false);

  useEffect(() => {
    console.log(isPut);
  });

  useEffect(() => {
    (async function responseContentLesson() {
      try {
        const { data } = await axios.get(`/api/lessonContent/${_id}`);
        console.dir(data);
        if (data.content.length > 1) {
          setIsPut(true);
        }
        setGoCreate(true);
        setLesson((prevState) => {
          return [...prevState, ...data.content];
        });
      } catch (error) {
        console.log(error.response.data);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendDataToServer = async (): Promise<void> => {
    try {
      const lessonWithoutHead = [...lesson];
      lessonWithoutHead.shift();
      console.log(lessonWithoutHead);
      !isPut && (await axios.post(`/api/LessonContent/${_id}`, { content: lessonWithoutHead }));
      isPut && (await axios.put(`/api/LessonContent/${_id}`, { content: lessonWithoutHead }));
      console.log(isPut);
      !isPut && setIsPut(true);
      console.log('Данные успешно отправлены');
    } catch (error) {
      console.log(error.response.data);
    }
  };

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

  const newContent = (): void => {
    setFormNewContent((prevState) => !prevState);
  };

  return (
    <div className="lesson">
      <div className="lesson-wrapper">
        {lesson.map((item, index) => createContent({ item, index }))}
      </div>
      {goCreate && (
        <div style={{ paddingTop: '20px' }}>
          <button
            style={{ color: 'white', width: '280px', background: 'black', marginBottom: '20px' }}
            onClick={newContent}
          >
            {formNewContent ? 'Отменить' : 'Добавить контент'}
          </button>
          <button
            style={{ color: 'white', width: '280px', background: 'black', marginBottom: '20px' }}
            onClick={sendDataToServer}
          >
            Сохранить изменения на сервере
          </button>
        </div>
      )}
      <div style={{ display: `${formNewContent ? 'block' : 'none'}` }}>
        {FormNewContent({ setFormNewContent, setLesson })}
      </div>
      <div style={{ paddingTop: '20px' }}>
        <Link style={{ color: 'white' }} to={`/createTest/${_id}`}>
          Редактировать тесты
        </Link>
      </div>
    </div>
  );
};
