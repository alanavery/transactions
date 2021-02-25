import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DeleteAccountForm = (props) => {
  const [confirm, setConfirm] = useState(false);

  useEffect(() => setConfirm(false), [props.currentAccount]);

  const renderDeleteForm = () => {
    if (!confirm) {
      return <button onClick={toggleConfirm}>Delete</button>;
    } else {
      return (
        <div>
          <p>Are you sure?</p>
          <button onClick={deleteAccount}>Yes</button>
          <button onClick={toggleConfirm}>No</button>
        </div>
      );
    }
  };

  const toggleConfirm = () => {
    setConfirm(!confirm ? true : false);
  };

  const deleteAccount = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/users/${props.currentUser._id}/accounts/${props.currentAccount._id}`);
      alert('Account deleted.');
      props.updateUsers();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h3>Delete Account</h3>
      {renderDeleteForm()}
    </div>
  );
};
