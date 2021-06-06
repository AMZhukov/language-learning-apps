import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import useIsMounted from '../../hooks/useIsMounted.hook';
import './ListOfCourses.scss';
import IconEdit from '../../assets/images/Icon-edit.svg';
import IconSave from '../../assets/images/Icon-save.svg';
import IconCancel from '../../assets/images/Icon-cancel.svg';
import IconRemove from '../../assets/images/Icon-remove.svg';

export const ListOfCourses = () => {
  const isMounted = useIsMounted();
  const [courseList, setCourseList] = useState([]);
  const [courseListChanged, setCourseListChanged] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/courseList');
        response.data.forEach((item) => (item.contenteditable = false));
        console.log(response.data);
        if (isMounted()) {
          setCourseList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeContenteditable = (index, isCountentditable) => {
    const initialValue = { ...courseList[index], contenteditable: isCountentditable };
    if (isCountentditable) {
      setCourseListChanged((prevState) => [...prevState, (prevState[index] = initialValue)]);
    }
    setCourseList((prevState) => {
      const newState = prevState.filter((item) => item._id !== initialValue._id);
      return [...newState, initialValue];
    });
  };

  const changeCourse = (value, index, fieldName) => {
    setCourseListChanged((prevState) => [...prevState, (prevState[index][fieldName] = value)]);
  };

  const deleteCourse = async (index) => {
    const _id = courseList[index]._id;
    try {
      await axios.delete(`/api/deleteCourse/${_id}`);
      setCourseList((prevState) => {
        const newState = prevState.filter((item) => item._id !== _id);
        return [...newState];
      });
    } catch (error) {
      console.log(error.data.response);
    }
  };

  const saveChanges = async (index) => {
    try {
      const course = { ...courseListChanged[index] };
      await axios.put('/api/changeCourse', course);
      setCourseList((prevState) => {
        const newState = prevState.filter((item) => item._id !== course._id);
        return [...newState, courseListChanged[index]];
      });
      changeContenteditable(index, false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="list-of-courses">
      {courseList.length > 0 && (
        <div className="container">
          {courseList.map((item, index) => {
            return (
              <div className="list-of-courses__wrapper" key={item._id}>
                <div className="list-of-courses__image-wrapper">
                  <Link className="list-of-courses__description">
                    <img
                      src={item.imagePreview}
                      alt="logo lesson"
                      className="list-of-courses__image"
                    />
                  </Link>
                </div>
                {!courseList[index].contenteditable && (
                  <>
                    <div className="list-of-courses__description-wrapper">
                      <Link className="list-of-courses__description">{item.name}</Link>
                      <Link className="list-of-courses__description">{item.description}</Link>
                    </div>{' '}
                    <div className="list-of-courses__actions">
                      <button
                        className="list-of-courses__button list-of-courses_button-hover-opacity"
                        type="button"
                        onClick={() => changeContenteditable(index, true)}
                      >
                        <img src={IconEdit} alt="Edit" />
                      </button>
                    </div>
                  </>
                )}
                {courseList[index].contenteditable && (
                  <>
                    <div className="list-of-courses__description-wrapper">
                      <input
                        className="list-of-courses__input"
                        type="text"
                        value={courseListChanged[index].name}
                        onChange={(event) => changeCourse(event.target.value, index, 'name')}
                      />
                      <input
                        className="list-of-courses__input"
                        type="text"
                        value={courseListChanged[index].description}
                        onChange={(event) => changeCourse(event.target.value, index, 'description')}
                      />
                    </div>
                    <div className="list-of-courses__actions">
                      <button
                        className="list-of-courses__button"
                        type="button"
                        onClick={() => saveChanges(index)}
                      >
                        <img src={IconSave} alt="Save change" />
                      </button>
                      <button
                        className="list-of-courses__button"
                        type="button"
                        onClick={() => changeContenteditable(index, false)}
                      >
                        <img src={IconCancel} alt="Cancel change" />
                      </button>
                      <button
                        className="list-of-courses__button"
                        type="button"
                        onClick={() => deleteCourse(index)}
                      >
                        <img
                          className="list-of-courses__icon"
                          src={IconRemove}
                          alt="Delete course"
                        />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
