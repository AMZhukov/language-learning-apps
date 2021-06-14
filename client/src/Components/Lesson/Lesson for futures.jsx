// This file has been to archived
// I'll go back later, someday
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './Lesson.scss';
import 'normalize.css';
import EditIcons from '../../../src/assets/images/Icon-edit.svg';
import SaveIcons from '../../../src/assets/images/Icon-save.svg';
import CancelIcons from '../../../src/assets/images/Icon-cancel.svg';

export const LessonForFutures = () => {
  const idLesson = useParams();
  const [content, setContent] = useState({});
  const [lesson1, setLesson] = useState([
    {
      Tag: 'div',
      className: '',
      content: ['Изучение языков'],
    },
  ]);
  const sendDataToServer = () => {
    axios.post(`/api/lesson/${idLesson}`, lesson1);
  };
  const changeInput = (value, id) => {
    setContent((prevState) => {
      return { ...prevState, ...{ [id]: { ...prevState[id], value } } };
    });
  };
  const toggleCreation = (id) => {
    setContent((prevState) => {
      let toggle = true;
      if (prevState?.[id]?.visible) {
        toggle = false;
      }
      return { ...prevState, ...{ [id]: { ...prevState[id], visible: toggle } } };
    });
  };

  const saveChange = (id, lesson, oldId) => {
    if (id.length > 1) {
      const newId = id.shift();
      if (Array.isArray(lesson[newId])) {
        saveChange(id, lesson[newId], oldId);
      } else {
        saveChange(id, lesson[newId].content, oldId);
      }
    } else {
      // const indexIndex = id;
      const newContent = content[oldId].value;
      // setLesson((prevState) =>
      //   prevState.map((item, index) => {
      //     if (index === indexIndex) {
      //       return {
      //         ...item,
      //         content: [...item.content, newContent],
      //       };
      //     }
      //     return item;
      //   }),
      // );
      setLesson((prevState) => deployingState(prevState, oldId.split(''), newContent));
    }
  };

  const deployingState = (prevState, id, newContent) => {
    if (id.length > 1) {
      const newId = id.shift();
      let newState;
      if (Array.isArray(prevState)) {
        newState = [...prevState];
        newState[newId] = deployingState(newState[newId], id, newContent);
      } else {
        newState = { ...prevState };
        newState.content = deployingState(newState.content, id, newContent);
      }
      return newState;
    }

    if (Array.isArray(prevState)) {
      const newState = [...prevState];
      newState.splice(id, 0, newContent);
      return newState;
    } else {
      return {
        ...prevState,
        content: [...prevState.content, newContent],
      };
    }
  };

  useEffect(() => {
    console.log(lesson1);
  });
  const createContent = (chekedContent, id = '0') => {
    if (Array.isArray(chekedContent)) {
      return chekedContent.map((item, index) => {
        if (typeof item === 'string') {
          return item;
        }
        const { Tag: NewTag, className: newClassName, content: newContent } = item;
        const newIndex = `${id}` + index;

        return (
          <React.Fragment key={`${id}` + index}>
            <NewTag className={newClassName} data-id={newIndex} key={newIndex}>
              {createContent(newContent, newIndex)}
            </NewTag>
            <label>
              <input
                type="text"
                data-id={newIndex}
                style={{ display: content?.[newIndex]?.visible ? 'block' : 'none' }}
                onChange={(event) => changeInput(event.target.value, event.target.dataset.id)}
              />{' '}
            </label>
            <button
              className="lesson__button"
              title={content?.[newIndex]?.visible ? 'Отменить' : 'Добавить в тот же блок'}
              data-id={newIndex}
              onClick={(event) => toggleCreation(event.target.dataset.id)}
            >
              <img
                data-id={newIndex}
                src={content?.[newIndex]?.visible ? CancelIcons : EditIcons}
                alt={content?.[newIndex]?.visible ? 'Отменить изменения' : 'Добавить в тот же блок'}
              />
            </button>
            <button
              className="lesson__button"
              title="Сохранить изменения"
              data-id={newIndex}
              onClick={(event) =>
                saveChange(event.target.dataset.id.split(''), lesson1, event.target.dataset.id)
              }
            >
              <img src={SaveIcons} alt="Сохранить изменения" data-id={newIndex} />
            </button>
          </React.Fragment>
        );
      });
    }
    return chekedContent;
  };

  return (
    <div style={{ padding: '150px', background: 'blueviolet' }}>
      {/*<div dangerouslySetInnerHTML={{ __html: yourhtml }} />*/}
      <div className="lesson">{createContent(lesson1)}</div>
      <button onClick={sendDataToServer}>Сохранить изменения</button>
    </div>
  );
};
