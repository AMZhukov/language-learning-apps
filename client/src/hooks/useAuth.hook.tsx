import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from './useTypesSelector.hook';
import { useActions } from './useActions.hook';
import { setUserAction } from '../Redux/login/userAction';

export const useAuth: () => void = () => {
  const history = useHistory();
  const { refreshAuthAction } = useActions();
  const { token, isLogout } = useTypedSelector((store) => {
    return store.user;
  });

  const checkingIfTheTokenIsValid = (token: any) => {
    const tokenExpirationDate = token.split('.');
    const { exp } = JSON.parse(atob(tokenExpirationDate[1]));
    console.log(new Date(exp * 1000));
    return exp * 1000 > Date.now();
  };

  useEffect(() => {
    const localStorageCurrentToken = localStorage.getItem('token');
    if (token) {
      localStorage.setItem('token', token);
    } else if (isLogout) {
      localStorage.removeItem('token');
      history.push('/');
    } else if (localStorageCurrentToken && checkingIfTheTokenIsValid(localStorageCurrentToken)) {
      console.log(localStorageCurrentToken);
      setUserAction(localStorageCurrentToken);
    } else {
      refreshAuthAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
};
