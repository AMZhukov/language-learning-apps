import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUserAction } from '../Redux/login/userAction';
import { useHistory } from 'react-router-dom';

export const useAuth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((store) => {
    return store.user.token;
  });
  const userId = useSelector((store) => {
    return store.user.userId;
  });
  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      dispatch(setUserAction(localStorage.getItem('userId'), localStorage.getItem('token')));
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      history.push('/');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      history.push('/');
    }
  }, [token, userId]);
};
