import React, { useState } from 'react';
import axios from 'axios';

function NewUserForm(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const addUser = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post('http://localhost:8000/users', {
        firstName: firstName,
        lastName: lastName,
        email: email
      });
      alert('User added.');
      props.updateUsers();
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form onSubmit={addUser}>
      <label htmlFor="user-first-name">First Name</label>
      <input
        id="user-first-name"
        type="text"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />

      <label htmlFor="user-last-name">Last Name</label>
      <input
        id="user-last-name"
        type="text"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />

      <label htmlFor="user-email">Email</label>
      <input
        id="user-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
}

export default NewUserForm;
