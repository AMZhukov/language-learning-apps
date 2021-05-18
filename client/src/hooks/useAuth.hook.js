import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUserAction } from '../Redux/login/userAction';

export const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => {
    return store.user.token;
  });
  const userId = useSelector((store) => {
    return store.user.userId;
  });
  useEffect(() => {
    console.log(token);
    if (!token && localStorage.getItem('token')) {
      dispatch(setUserAction(localStorage.getItem('userId'), localStorage.getItem('token')));
    }
  }, []);

  useEffect(() => {
    console.log('Зашли в UseEffect');
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
    } else {
      localStorage.setItem('token', null);
      localStorage.setItem('userId', null);
    }
  }, [token, userId]);
};
