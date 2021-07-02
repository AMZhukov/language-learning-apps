import React, { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { useActions } from '../../hooks/useActions.hook';
import { useTypedSelector } from '../../hooks/useTypesSelector.hook';
import { UsersList } from '../../Redux/login/userTypes';
import { User } from './User';

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
      <table style={{ paddingTop: '10px', margin: '0 auto', color: 'white' }}>
        <caption style={{ paddingTop: '160px' }}>Список пользователей</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>емайл</th>
            <th>Имя пользователя</th>
            <th>Активирована</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((item, index) => (
            <User
              _id={item._id}
              email={item.email}
              username={item.username}
              isActivated={item.isActivated}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
