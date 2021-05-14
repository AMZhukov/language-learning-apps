import { combineReducers } from 'redux';
import { testReducer } from './Test/testReducer';

export const rootReducer = combineReducers({
  test: testReducer,
});
