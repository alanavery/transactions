import React, { useState } from 'react';
import axios from 'axios';

function NewAccountForm(props) {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [credit, setCredit] = useState(false);

  const addAccount = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(`http://localhost:8000/users/${props.currentUserId}/accounts`, {
        name: name,
        balance: balance,
        credit: credit
      });
      alert(res.data);
      props.updateAccounts();
      setName('');
      setBalance(0);
      setCredit(false);
      document.getElementById('credit').checked = false;
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form onSubmit={addAccount}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="balance">Balance</label>
      <input
        id="balance"
        type="number"
        value={balance}
        onChange={(event) => setBalance(event.target.value)}
      />
      <label htmlFor="credit">Credit</label>
      <input
        id="credit"
        type="checkbox"
        onChange={(event) => event.target.checked ? setCredit(true) : setCredit(false)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default NewAccountForm;