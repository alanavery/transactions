import React, { useState } from 'react';
import axios from 'axios';

export const NewAccountForm = (props) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [credit, setCredit] = useState(false);

  const addAccount = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(`http://localhost:8000/users/${props.currentUserId}/accounts`, {
        name: name,
        balance: balance,
        credit: credit
      });
      alert('Account added.');
      props.updateUsers();
      setName('');
      setBalance('');
      setCredit(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form onSubmit={addAccount}>
      <label htmlFor="account-name">Name</label>
      <input
        id="account-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="account-balance">Balance</label>
      <input
        id="account-balance"
        type="number"
        value={balance}
        onChange={(event) => setBalance(event.target.value)}
      />

      <label htmlFor="account-credit">Credit</label>
      <input
        id="account-credit"
        type="checkbox"
        checked={credit}
        onChange={(event) => event.target.checked ? setCredit(true) : setCredit(false)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
