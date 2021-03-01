import React, { useState } from 'react';
import axios from 'axios';

export const DeleteTransactionForm = (props) => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/users/${props.currentUserId}/accounts/${props.currentAccountId}/transactions/${props.transaction._id}`);
      alert('Transaction deleted.');
      props.updateUsers();
      setShowForm(false);
    } catch (err) {
      alert(err);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm ? true : false);
  };

  return (
    <div>
      <button onClick={toggleForm}>{!showForm ? 'Delete' : 'Cancel'}</button>

      {showForm && <div>
        <p>Are you sure?</p>
        <button onClick={handleClick}>Yes</button>
      </div>}
    </div>
  );
};
