import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import NewUserForm from './components/NewUserForm';
import NewAccountForm from './components/NewAccountForm';
import NewTransactionForm from './components/NewTransactionForm';
import TransactionTable from './components/TransactionTable';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [currentAccount, setCurrentAccount] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    updateUsers();
  }, []);

  const updateUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/users');
      setUsers(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const listUsers = users.map((user) => {
    return (
      <li key={user._id}>
        <a href="" onClick={(event) => {
          event.preventDefault();
          setCurrentUser(user);
          setAccounts(user.accounts);
        }}>
          {user.first_name} {user.last_name}
        </a>
      </li>
    );
  });

  const listAccounts = accounts.map((account) => {
    return (
      <li key={account._id}>
        <a href="" onClick={(event) => {
          event.preventDefault();
          setCurrentAccount(account);
          setTransactions(account.transactions);
        }}>
          {account.name}
        </a>
      </li>
    );
  });

  return (
    <div className="container">
      <div className="forms">
        <h3>Add User</h3>
        <NewUserForm updateUsers={updateUsers} />

        <h3>Users</h3>
        <ul>{listUsers}</ul>

        {Object.entries(currentUser).length > 0 && <div>
          <h3>Add Account</h3>
          <NewAccountForm
            currentUserId={currentUser._id}
            updateUsers={updateUsers}
          />

          <h3>Accounts</h3>
          <ul>{listAccounts}</ul>
        </div>}
      </div>

      <div className="account-info">
        {Object.entries(currentUser).length > 0 && <h1>{currentUser.first_name}'s Account</h1>}
        {Object.entries(currentAccount).length > 0 && <h2>{currentAccount.name}</h2>}
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
