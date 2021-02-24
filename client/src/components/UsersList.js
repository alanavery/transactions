export const UsersList = (props) => {
  const listItems = props.users.map((user) => {
    return (
      <li key={user._id}>
        <a
          href=""
          onClick={(event) => {
            event.preventDefault();
            props.setCurrentUser(user);
            props.setCurrentAccount({});
          }}
        >
          {user.first_name} {user.last_name}
        </a>
      </li>
    );
  });

  return (
    <div>
      <h3>Users</h3>
      <ul>{listItems}</ul>
    </div>
  );
};
