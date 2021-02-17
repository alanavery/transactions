import React from 'react';

function UsersList(props) {
  const listItems = props.users.map((user) => {
    return (
      <li key={user._id}>
        <a href="" onClick={(event) => {
          event.preventDefault();
          props.setCurrentUser(user);
        }}>
          {user.first_name} {user.last_name}
        </a>
      </li>
    );
  });

  return (
    <ul>{listItems}</ul>
  );
}


export default UsersList;