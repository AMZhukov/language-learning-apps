import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActionCreators from '../Redux/login/userAction';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...UserActionCreators }, dispatch);
};
