import React, { useState } from 'react';

export const TransactionRow = (props) => {
  const [cleared, setCleared] = useState(props.transaction.cleared);

  const date = new Date(props.transaction.date);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  const handleChange = ({ target }) => {
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
