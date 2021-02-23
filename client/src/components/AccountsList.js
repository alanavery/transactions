import React from 'react';

export const AccountsList = (props) => {
  const listItems = props.accounts.map((account) => {
    return (
      <li key={account._id}>
        <a href="" onClick={(event) => {
          event.preventDefault();
          props.setCurrentAccount(account);
        }}>
          {account.name}
        </a>
      </li>
    );
  });

  return (
    <ul>{listItems}</ul>
  );
};
