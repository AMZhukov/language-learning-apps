import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUserAction } from '../Redux/login/userAction';
import { useHistory } from 'react-router-dom';

export const useAuth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token, isLogout } = useSelector((store) => {
    return store.user;
  });
  useEffect(() => {
    console.log('Заходит в хук')
    if (token) {
      console.log(1)
      localStorage.setItem('token', token);
    } else if (isLogout) {
      console.log(2)
      localStorage.removeItem('token');
      history.push('/');
    } else if (localStorage.getItem('token')) {
      console.log(3)
      dispatch(setUserAction(localStorage.getItem('token')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
};
