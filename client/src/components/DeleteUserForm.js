import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DeleteUserForm = (props) => {
  const handleClick = async () => {
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
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};
