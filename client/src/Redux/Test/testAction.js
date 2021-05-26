import {
  ADD_CORRECT_ANSWER,
  CHANGE_NUMBERS_QUESTIONS,
  CLEAR_NUMBER_CORRECT_ANSWER,
} from './testTypes';

export const addCorrectAnswer = () => {
  return (dispatch, getState) => {
    let numberOfCorrectAnswers = getState().test.numberOfCorrectAnswers + 1;
    dispatch({ type: ADD_CORRECT_ANSWER, payload: { numberOfCorrectAnswers } });
  };
};

export const clearNumberCorrectAnswer = () => {
  return { type: CLEAR_NUMBER_CORRECT_ANSWER };
};

export const changeNumbersQuestions = (questions) => {
  console.log(questions);
  return { type: CHANGE_NUMBERS_QUESTIONS, payload: { numbersQuestions: questions } };
};
