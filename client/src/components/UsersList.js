export const UsersList = (props) => {
  const renderList = props.users.map((user) => {
    return (
      <li key={user._id}>
        <a
          href=""
          onClick={(event) => {
            event.preventDefault();
            props.setCurrentUser(user);
          }}
        >
          {user.first_name} {user.last_name}
        </a>
      </li>
    );
  });

  return (
    <div className="list">
      <h3>Users</h3>
      <ul>{renderList}</ul>
    </div>
  );
};
