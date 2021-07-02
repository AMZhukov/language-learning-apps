import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from './useTypesSelector.hook';
import { useActions } from './useActions.hook';

export const useAuth: () => void = () => {
  const history = useHistory();
  const { refreshAuthAction, setUserAction } = useActions();
  const { token, isLogout } = useTypedSelector((store) => {
    return store.user;
  });

  const checkingIfTheTokenIsValid = (token: any) => {
    const tokenExpirationDate = token.split('.');
    const { exp } = JSON.parse(atob(tokenExpirationDate[1]));
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
      setUserAction(localStorageCurrentToken);
    } else {
      refreshAuthAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
};
