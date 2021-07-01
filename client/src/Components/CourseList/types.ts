import { ILesson } from '../CreateLesson/types';

export interface ICourse {
  course: ILesson;
  index: number;
  deleteCourse: (index: number) => void;
}
