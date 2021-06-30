import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './login/userReducer';
import { testReducer } from './Test/testReducer';

const isProd = process.env.NODE_ENV === 'production';
// @ts-ignore
const composeEnhancers = isProd ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// const composeEnhancers = compose;

const rootReducer = combineReducers({
  test: testReducer,
  user: userReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;
