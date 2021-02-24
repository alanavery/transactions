import React, { useState } from 'react';
import axios from 'axios';

const getCurrentDate = () => {
  const date = new Date();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  return `${date.getFullYear()}-${month}-${date.getDate()}`;
};

const blankTransactionForm = {
  type: 'debit',
  amount: '',
  payee: '',
  date: getCurrentDate(),
  cleared: false
};

export const NewTransactionForm = (props) => {
  const [form, setForm] = useState(blankTransactionForm);

  const options = props.payees.map((payee) => {
    return <option value={payee.name} key={payee._id} />;
  });

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm((current) => ({ ...current, [target.name]: value }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(`http://localhost:8000/users/${props.currentUserId}/accounts/${props.currentAccountId}/transactions`, form);
      alert('Transaction added.');
      props.updateUsers();
      setForm(blankTransactionForm);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="transaction-type-debit">Debit</label>
      <input
        id="transaction-type-debit"
        name="type"
        type="radio"
        value="debit"
        checked={form.type === 'debit'}
        onChange={handleChange}
      />

      <label htmlFor="transaction-type-credit">Credit</label>
      <input
        id="transaction-type-credit"
        name="type"
        type="radio"
        value="credit"
        checked={form.type === 'credit'}
        onChange={handleChange}
      />

      <label htmlFor="transaction-amount">Amount</label>
      <input
        id="transaction-amount"
        name="amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
      />

      <label htmlFor="transaction-payee">Payee</label>
      <input
        id="transaction-payee"
        name="payee"
        list="transaction-payee-options"
        value={form.payee}
        onChange={handleChange}
      />
      <datalist id="transaction-payee-options">{options}</datalist>

      <label htmlFor="transaction-date">Date</label>
      <input
        id="transaction-date"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />

      <label htmlFor="transaction-cleared">Cleared</label>
      <input
        id="transaction-cleared"
        name="cleared"
        type="checkbox"
        checked={form.cleared}
        onChange={handleChange}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
