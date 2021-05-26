import {
  ADD_CORRECT_ANSWER,
  CHANGE_NUMBERS_QUESTIONS,
  CLEAR_NUMBER_CORRECT_ANSWER,
} from './testTypes';

const initialState = {
  numberOfCorrectAnswers: 0,
  numbersQuestions: null,
};

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CORRECT_ANSWER:
      return {
        ...state,
        numberOfCorrectAnswers: action.payload.numberOfCorrectAnswers,
      };
    case CLEAR_NUMBER_CORRECT_ANSWER:
      return {
        ...state,
        numberOfCorrectAnswers: 0,
      };
    case CHANGE_NUMBERS_QUESTIONS:
      return {
        ...state,
        numbersQuestions: action.payload.numbersQuestions,
      };
    default:
      return state;
  }
};
