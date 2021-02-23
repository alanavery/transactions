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

  const calculateBalance = (cleared) => {
    let balance = currentAccount.balance;
    let transactions;
    if (cleared) {
      transactions = currentAccount.transactions.filter((transaction) => transaction.cleared);
    } else {
      transactions = currentAccount.transactions;
    }
    transactions.forEach((transaction) => {
      if (transaction.type === 'debit') {
        balance -= transaction.amount;
      } else if (transaction.type === 'credit') {
        balance += transaction.amount;
      }
    });
    return balance;
  };

  return (
    <div className="container">
      <div className="forms">
        <h3>Add User</h3>
        <NewUserForm updateUsers={updateUsers} />

        <h3>Users</h3>
        <UsersList
          users={users}
          setCurrentUser={setCurrentUser}
        />

        {currentUser._id && <div>
          <h3>Add Account</h3>
          <NewAccountForm
            currentUserId={currentUser._id}
            updateUsers={updateUsers}
          />

          <h3>Accounts</h3>
          <AccountsList
            accounts={currentUser.accounts}
            setCurrentAccount={setCurrentAccount}
          />
        </div>}

        {currentAccount._id && <div>
          <h3>Add Transaction</h3>
          <NewTransactionForm
            currentUserId={currentUser._id}
            currentAccountId={currentAccount._id}
            updateUsers={updateUsers}
            payees={payees}
          />
        </div>}
      </div>

      <div className="account-info">
        {currentUser._id && <h1>{currentUser.first_name}'s Account</h1>}
        {currentAccount._id && <div>
          <h2>{currentAccount.name}</h2>
          <p>Starting Balance: {currentAccount.balance}</p>
          <p>Cleared: {calculateBalance(true)}</p>
          <p>Uncleared: {calculateBalance(false)}</p>
          <TransactionTable transactions={currentAccount.transactions} />
        </div>}
      </div>
    </div>
  );
};

export default App;
