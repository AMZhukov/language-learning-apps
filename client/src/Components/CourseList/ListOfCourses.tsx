import React, { useEffect, useState } from 'react';
import axios from 'axios';

import useIsMounted from '../../hooks/useIsMounted.hook.js';
import { Course } from './Course';
import { ILesson } from '../CreateLesson/types';
import './ListOfCourses.scss';

export const ListOfCourses: React.FC = () => {
  const isMounted = useIsMounted();
  const [courseList, setCourseList] = useState<ILesson[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const { data } = await axios.get('/api/courseList');
        if (isMounted()) {
          setCourseList(data);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteCourse = async (index: number): Promise<void> => {
    const { _id } = courseList[index];
    return alert('Удаление лекций, на текущий момент отключено');
    try {
      await axios.delete(`/api/deleteCourse/${_id}`);
      setCourseList((prevState) => {
        const newState = prevState.filter((item) => item._id !== _id);
        return [...newState];
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="list-of-courses">
      {courseList.length > 0 && (
        <div className="container">
          {courseList.map((course, index) => {
            return Course({ course, index, deleteCourse });
          })}
        </div>
      )}
    </div>
  );
};
