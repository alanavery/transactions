import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export const TransactionRow = (props) => {
  const [cleared, setCleared] = useState(props.transaction.cleared);

  const initialRender = useRef(true);

  const date = new Date(props.transaction.date);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  useEffect(async () => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      try {
        const res = await axios.put(`http://localhost:8000/users/${props.currentUserId}/accounts/${props.currentAccountId}/transactions/${props.transaction._id}`, { cleared: cleared });
        props.updateUsers();
      } catch (err) {
        alert(err);
      }
    }
  }, [cleared]);

  const handleChange = async ({ target }) => {
    setCleared(target.checked);
  };

  return (
    <tr className={props.transaction.type}>
      <td>{`$${props.transaction.amount.toFixed(2)}`}</td>
      <td>{props.transaction.payee.name}</td>
      <td>{formattedDate}</td>
      <td>
        <input
          type="checkbox"
          checked={cleared}
          onChange={handleChange}
        />
      </td>
    </tr>
  );
};
