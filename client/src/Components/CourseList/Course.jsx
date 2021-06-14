import React from 'react';
import { Link } from "react-router-dom";
import IconEdit from "../../assets/images/Icon-edit.svg";
import IconRemove from "../../assets/images/Icon-remove.svg";

import 'normalize.css';
import './ListOfCourses.scss';

export const Course = ({ course, index, deleteCourse }) => {
	return (
		<div className="list-of-courses__wrapper" key={course._id}>
			<div className="list-of-courses__image-wrapper">
				<Link className="list-of-courses__description" to={`/lesson/${course._id}`}>
					<img
						src={course.imagePreview}
						alt="logo lesson"
						className="list-of-courses__image"
					/>
				</Link>
			</div>
			<div className="list-of-courses__description-wrapper">
				<Link className="list-of-courses__description" to={`/lesson/${course._id}`}>
					<strong className="list-of-courses__elem">
						{course.headNumber}
						.
						{course.lessonNumber}
					</strong>
					{' '}
					{course.name}
				</Link>
				<Link className="list-of-courses__description" to={`/lesson/${course._id}`}>
					{course.description}
				</Link>
			</div>
			{' '}
			<div className="list-of-courses__actions">
				<Link
					to={`/editLesson/${course._id}`}
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
		</div>
	);
}
