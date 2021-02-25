import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const EditAccountForm = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(props.accountForm);

  useEffect(() => {
    setForm({
      name: props.currentAccount.name,
      balance: props.currentAccount.balance,
      credit: props.currentAccount.credit
    });
  }, [props.currentAccount]);

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm((current) => ({ ...current, [target.name]: value }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.put(`http://localhost:8000/users/${props.currentUser._id}/accounts/${props.currentAccount._id}`, form);
      alert('Account edited.');
      props.updateUsers();
      setShowForm(false);
    } catch (err) {
      alert(err);
      props.updateUsers();
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm ? true : false);
  };

  return (
    <div className="form">
      <button onClick={toggleForm}>{!showForm ? 'Edit Account' : 'Cancel'}</button>

      {showForm && <form onSubmit={handleSubmit}>
        <label htmlFor="edit-account-name">Name</label>
        <input
          id="edit-account-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="edit-account-balance">Balance</label>
        <input
          id="edit-account-balance"
          name="balance"
          type="number"
          value={form.balance}
          onChange={handleChange}
        />

        <label htmlFor="edit-account-credit">Credit</label>
        <input
          id="edit-account-credit"
          name="credit"
          type="checkbox"
          checked={form.credit}
          onChange={handleChange}
        />

        <input type="submit" value="Submit" />
      </form>}
    </div>
  );
};
