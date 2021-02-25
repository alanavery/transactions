import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const EditUserForm = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(props.userForm);

  useEffect(() => {
    setForm({
      firstName: props.currentUser.first_name,
      lastName: props.currentUser.last_name,
      email: props.currentUser.email
    });
  }, [props.currentUser]);

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.put(`http://localhost:8000/users/${props.currentUser._id}`, form);
      alert('User edited.');
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
      <button onClick={toggleForm}>{!showForm ? 'Edit User' : 'Cancel'}</button>

      {showForm && <form onSubmit={handleSubmit}>
        <label htmlFor="edit-user-first-name">First Name</label>
        <input
          id="edit-user-first-name"
          name="firstName"
          type="text"
          value={form.firstName}
          onChange={handleChange}
        />

        <label htmlFor="edit-user-last-name">Last Name</label>
        <input
          id="edit-user-last-name"
          name="lastName"
          type="text"
          value={form.lastName}
          onChange={handleChange}
        />

        <label htmlFor="edit-user-email">Email</label>
        <input
          id="edit-user-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <input type="submit" value="Submit" />
      </form>}
    </div>
  );
};
