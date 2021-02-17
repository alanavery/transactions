import React, { useState } from 'react';
import axios from 'axios';

function NewTransactionForm(props) {
  const [type, setType] = useState('debit');
  const [amount, setAmount] = useState('');
  const [payee, setPayee] = useState('');
  const [date, setDate] = useState('');
  const [cleared, setCleared] = useState(false);

  const options = props.payees.map((payee) => {
    return <option value={payee.name} key={payee._id} />;
  });

  const addTransaction = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(`http://localhost:8000/users/${props.currentUserId}/accounts/${props.currentAccountId}/transactions`, {
        type: type,
        amount: amount,
        payee: payee,
        date: date,
        cleared: cleared
      });
      alert('Transaction added.');
      props.updateUsers();
      setType('debit');
      setAmount('');
      setPayee('');
      setDate('');
      setCleared(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form onSubmit={addTransaction}>
      <label htmlFor="transaction-type-debit">Debit</label>
      <input
        id="transaction-type-debit"
        type="radio"
        value="debit"
        checked={type === 'debit'}
        onChange={(event) => setType(event.target.value)}
      />

      <label htmlFor="transaction-type-credit">Credit</label>
      <input
        id="transaction-type-credit"
        type="radio"
        value="credit"
        checked={type === 'credit'}
        onChange={(event) => setType(event.target.value)}
      />

      <label htmlFor="transaction-amount">Amount</label>
      <input
        id="transaction-amount"
        type="number"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />

      <label htmlFor="transaction-payee">Payee</label>
      <input
        id="transaction-payee"
        list="transaction-payee-options"
        value={payee}
        onChange={(event) => setPayee(event.target.value)}
      />
      <datalist id="transaction-payee-options">{options}</datalist>

      <label htmlFor="transaction-date">Date</label>
      <input
        id="transaction-date"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <label htmlFor="transaction-cleared">Cleared</label>
      <input
        id="transaction-cleared"
        type="checkbox"
        checked={cleared}
        onChange={(event) => event.target.checked ? setCleared(true) : setCleared(false)}
      />


      <input type="submit" value="Submit" />
    </form>
  );
}

export default NewTransactionForm;
