import React, { useState } from 'react';
import axios from 'axios';

export const NewUserForm = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(props.userForm);

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post('http://localhost:8000/users', form);
      alert('User added.');
      props.updateUsers();
      setShowForm(false);
      setForm(props.userForm);
    } catch (err) {
      alert(err);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm ? true : false);
  };

  return (
    <div className="form">
      <button onClick={toggleForm}>{!showForm ? 'Add User' : 'Cancel'}</button>

      {showForm && <form onSubmit={handleSubmit}>
        <label htmlFor="user-first-name">First Name</label>
        <input
          id="user-first-name"
          name="firstName"
          type="text"
          value={form.firstName}
          onChange={handleChange}
        />

        <label htmlFor="user-last-name">Last Name</label>
        <input
          id="user-last-name"
          name="lastName"
          type="text"
          value={form.lastName}
          onChange={handleChange}
        />

        <label htmlFor="user-email">Email</label>
        <input
          id="user-email"
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
