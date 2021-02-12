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
      alert(res.data);
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
      <label htmlFor="first-name">First Name</label>
      <input
        id="first-name"
        type="text"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <label htmlFor="last-name">Last Name</label>
      <input
        id="last-name"
        type="text"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default NewUserForm;
