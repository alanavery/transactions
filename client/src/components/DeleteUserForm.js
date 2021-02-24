import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DeleteUserForm = (props) => {
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    setConfirm(false);
  }, [props.currentUser]);

  const renderDeleteForm = () => {
    if (!confirm) {
      return <button onClick={toggleConfirm}>Delete</button>;
    } else {
      return (
        <div>
          <p>Are you sure?</p>
          <button onClick={deleteUser}>Yes</button>
          <button onClick={toggleConfirm}>No</button>
        </div>
      );
    }
  };

  const toggleConfirm = () => {
    setConfirm(!confirm ? true : false);
  };

  const deleteUser = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/users/${props.currentUser._id}`);
      alert('User deleted.');
      props.updateUsers();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h3>Delete User</h3>
      {renderDeleteForm()}
    </div>
  );
};
