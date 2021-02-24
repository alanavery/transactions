export const AccountsList = (props) => {
  const listItems = props.currentUser.accounts.map((account) => {
    return (
      <li key={account._id}>
        <a
          href=""
          onClick={(event) => {
            event.preventDefault();
            props.setCurrentAccount(account);
          }}
        >
          {account.name}
        </a>
      </li>
    );
  });

  return (
    <div>
      <h3>{props.currentUser.first_name}'s Accounts</h3>
      <ul>{listItems}</ul>
    </div>
  );
};
