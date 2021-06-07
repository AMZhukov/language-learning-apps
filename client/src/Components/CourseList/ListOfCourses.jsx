import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import useIsMounted from '../../hooks/useIsMounted.hook';
import './ListOfCourses.scss';
import IconEdit from '../../assets/images/Icon-edit.svg';
import IconRemove from '../../assets/images/Icon-remove.svg';

export const ListOfCourses = () => {
  const isMounted = useIsMounted();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/courseList');
        if (isMounted()) {
          setCourseList(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteCourse = async (index) => {
    const { _id } = courseList[index];
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
                <>
                  <div className="list-of-courses__description-wrapper">
                    <Link className="list-of-courses__description">
                      {item.name}
                    </Link>
                    <Link className="list-of-courses__description">
                      {item.description}
                    </Link>
                  </div>{' '}
                  <div className="list-of-courses__actions">
                    <Link
                      to={`/CreateLesson/${item._id}`}
                      className="list-of-courses__button list-of-courses_button-hover-opacity"
                      type="button"
                    >
                      <img src={IconEdit} alt="Edit" />
                    </Link>
                    <button
                      className="list-of-courses__button list-of-courses_button-hover-opacity"
                      type="button"
                      onClick={() => deleteCourse(index)}
                    >
                      <img className="list-of-courses__icon" src={IconRemove} alt="Delete course" />
                    </button>
                  </div>
                </>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
