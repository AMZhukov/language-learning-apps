import { combineReducers } from 'redux';
import { testReducer } from './Test/testReducer';
import { userReducer } from './login/userReducer';

export const rootReducer = combineReducers({
  test: testReducer,
  user: userReducer,
});
