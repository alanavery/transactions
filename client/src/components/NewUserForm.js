import React, { useState } from 'react';
import axios from 'axios';

const blankUserForm = {
  firstName: '',
  lastName: '',
  email: ''
};

export const NewUserForm = (props) => {
  const [form, setForm] = useState(blankUserForm);

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post('http://localhost:8000/users', form);
      alert('User added.');
      props.updateUsers();
      setForm(blankUserForm);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h3>Add User</h3>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};
