import React, { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { useActions } from '../../hooks/useActions.hook';
import { useTypedSelector } from '../../hooks/useTypesSelector.hook';
import { UsersList } from '../../Redux/login/userTypes';

export const GetUsers: React.FC = () => {
  const [listUsers, setListUsers] = useState<UsersList>([]);
  const { getUsersAction } = useActions();
  const listUsersResponse = useTypedSelector((store) => {
    return store.user.listUsers;
  });

  useEffect(() => {
    getUsersAction();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return setListUsers(listUsersResponse);
  }, [listUsersResponse]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Header />
      <ul>
        {listUsers.length > 0 &&
          listUsers.map((item) => {
            return (
              <li style={{ color: 'white' }} key={item.email}>
                {item.email}
              </li>
            );
          })}
      </ul>
    </>
  );
};
