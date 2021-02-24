import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import { NewUserForm } from './components/NewUserForm';
import { NewAccountForm } from './components/NewAccountForm';
import { NewTransactionForm } from './components/NewTransactionForm';
import { UsersList } from './components/UsersList';
import { AccountsList } from './components/AccountsList';
import { TransactionTable } from './components/TransactionTable';

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentAccount, setCurrentAccount] = useState({});
  const [payees, setPayees] = useState([]);

  useEffect(() => {
    updateUsers();
    updatePayees();
  }, []);

  useEffect(() => {
    if (currentUser._id) {
      setCurrentUser(users.find((user) => user._id === currentUser._id));
    }
  }, [users]);

  useEffect(() => {
    if (currentAccount._id) {
      setCurrentAccount(currentUser.accounts.find((account) => account._id === currentAccount._id));
    }
  }, [currentUser]);

  const updateUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/users');
      setUsers(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const updatePayees = async () => {
    try {
      const res = await axios.get('http://localhost:8000/payees');
      setPayees(res.data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="container">
      <div className="users">
        <NewUserForm updateUsers={updateUsers} />

        <UsersList
          users={users}
          setCurrentUser={setCurrentUser}
          setCurrentAccount={setCurrentAccount}
        />
      </div>

      {currentUser._id && <div className="accounts">
        <NewAccountForm
          currentUser={currentUser}
          updateUsers={updateUsers}
        />

        <AccountsList
          currentUser={currentUser}
          setCurrentAccount={setCurrentAccount}
        />
      </div>}

      {currentAccount._id && <div className="transactions">
        <NewTransactionForm
          currentUser={currentUser}
          currentAccount={currentAccount}
          payees={payees}
          updateUsers={updateUsers}
        />

        <TransactionTable
          currentUser={currentUser}
          currentAccount={currentAccount}
          updateUsers={updateUsers}
        />
      </div>}
    </div>
  );
};

export default App;
