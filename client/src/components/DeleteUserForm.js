import React, { useState } from 'react';
import axios from 'axios';

export const DeleteUserForm = (props) => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/users/${props.currentUser._id}`);
      alert('User deleted.');
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
    <div className="form">
      <button onClick={toggleForm}>{!showForm ? 'Delete User' : 'Cancel'}</button>

      {showForm && <div>
        <p>Are you sure?</p>
        <button onClick={handleClick}>Yes</button>
      </div>}
    </div>
  );
};
