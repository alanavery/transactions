import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import { NewUserForm } from './components/NewUserForm';
import { NewAccountForm } from './components/NewAccountForm';
import { NewTransactionForm } from './components/NewTransactionForm';
import { EditUserForm } from './components/EditUserForm';
import { EditAccountForm } from './components/EditAccountForm';
import { DeleteUserForm } from './components/DeleteUserForm';
import { DeleteAccountForm } from './components/DeleteAccountForm';
import { UsersList } from './components/UsersList';
import { AccountsList } from './components/AccountsList';
import { TransactionTable } from './components/TransactionTable';

const userForm = {
  firstName: '',
  lastName: '',
  email: ''
};

const accountForm = {
  name: '',
  balance: '',
  credit: false
};

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
    const user = users.find((user) => user._id === currentUser._id);
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser({});
    }
  }, [users]);

  useEffect(() => {
    if (currentUser._id) {
      const account = currentUser.accounts.find((account) => account._id === currentAccount._id);
      if (account) {
        setCurrentAccount(account);
      } else {
        setCurrentAccount({});
      }
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
        <NewUserForm
          userForm={userForm}
          updateUsers={updateUsers}
        />

        <UsersList
          users={users}
          setCurrentUser={setCurrentUser}
          setCurrentAccount={setCurrentAccount}
        />
      </div>

      {currentUser._id && <div className="accounts">
        <EditUserForm
          userForm={userForm}
          currentUser={currentUser}
          updateUsers={updateUsers}
        />

        <DeleteUserForm
          currentUser={currentUser}
          updateUsers={updateUsers}
        />

        <NewAccountForm
          accountForm={accountForm}
          currentUser={currentUser}
          updateUsers={updateUsers}
        />

        <AccountsList
          currentUser={currentUser}
          setCurrentAccount={setCurrentAccount}
        />
      </div>}

      {currentAccount._id && <div className="transactions">
        <EditAccountForm
          accountForm={accountForm}
          currentUser={currentUser}
          currentAccount={currentAccount}
          updateUsers={updateUsers}
        />

        <DeleteAccountForm
          currentUser={currentUser}
          currentAccount={currentAccount}
          updateUsers={updateUsers}
        />

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
