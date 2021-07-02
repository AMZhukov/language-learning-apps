import React from 'react';

interface IUser {
  _id: string;
  email: string;
  username: string;
  index: number;
  isActivated: boolean;
}

export const User: React.FC<IUser> = ({ _id, email, username, isActivated, index }) => {
  return (
    <tr key={_id}>
      <td>{index + 1}</td>
      <td>{email}</td>
      <td>{username}</td>
      <td>{isActivated ? 'Да' : 'Нет'}</td>
      <td style={{ color: 'red' }}>
        <button
          title="Удалить"
          style={{
            color: 'inherit',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          X
        </button>
      </td>
    </tr>
  );
};
