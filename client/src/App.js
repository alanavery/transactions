import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import NewUserForm from './components/NewUserForm';
import NewAccountForm from './components/NewAccountForm';
import NewTransactionForm from './components/NewTransactionForm';
import TransactionTable from './components/TransactionTable';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    updateUsers();
  }, []);

  const updateUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/users');
      console.log(res.data);
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
        }}>
          {user.first_name} {user.last_name}
        </a>
      </li>
    );
  });

  const updateAccounts = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/users/${currentUser._id}/`);
      console.log(res.data);
      setUsers(res.data);
    } catch (err) {
      alert(err);
    }
  };

  // const listUsers = users.map((user) => {
  //   return (
  //     <li key={user._id}>
  //       <a href="" onClick={(event) => {
  //         event.preventDefault();
  //         setCurrentUser(user);
  //       }}>
  //         {user.first_name} {user.last_name}
  //       </a>
  //     </li>
  //   );
  // });

  return (
    <div className="container">
      <div className="forms">
        <h2>Add User</h2>
        <NewUserForm updateUsers={updateUsers} />

        <h2>Users</h2>
        <ul>{listUsers}</ul>

        {currentUser && <div>
          <h2>Add Account</h2>
          <NewAccountForm currentUserId={currentUser._id} />
        </div>}
      </div>

      {currentUser && <h1>{currentUser.first_name}'s Account</h1>}
      {/* <TransactionTable testData={testData} /> */}
    </div>
  );
}

export default App;
