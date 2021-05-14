import { ADD_CORRECT_ANSWER, CLEAR_NUMBER_CORRECT_ANSWER } from './testTypes';

const initialState = {
  numberOfCorrectAnswers: 0,
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
    default:
      return state;
  }
};
