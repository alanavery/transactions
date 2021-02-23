import React, { useState } from 'react';
import axios from 'axios';

const blankAccountForm = {
  name: '',
  balance: '',
  credit: false
};

export const NewAccountForm = (props) => {
  const [form, setForm] = useState(blankAccountForm);

  const handleChange = ({ target }) => {
    const value = target.name === 'credit' ? target.checked : target.value;
    setForm((current) => ({ ...current, [target.name]: value }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(`http://localhost:8000/users/${props.currentUserId}/accounts`, form);
      alert('Account added.');
      props.updateUsers();
      setForm(blankAccountForm);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="account-name">Name</label>
      <input
        id="account-name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
      />

      <label htmlFor="account-balance">Balance</label>
      <input
        id="account-balance"
        name="balance"
        type="number"
        value={form.balance}
        onChange={handleChange}
      />

      <label htmlFor="account-credit">Credit</label>
      <input
        id="account-credit"
        name="credit"
        type="checkbox"
        checked={form.credit}
        onChange={handleChange}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
