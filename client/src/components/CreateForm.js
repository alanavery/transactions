import React, { useState } from 'react';
import axios from 'axios';

export const CreateForm = (props) => {
  const [form, setForm] = useState(props.form);

  const handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm((current) => ({ ...current, [target.name]: value }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await axios.post(`http://localhost:8000${props.path}`, form);
      alert(`${props.model} added.`);
      props.updateUsers();
      setForm(props.form);
    } catch (err) {
      alert(err);
    }
  };

  const renderInput = (field) => {
    if (field.type === 'checkbox') {
      return <input
        id="text"
      />;
    }
  };

  const renderFormFields = () => {
    for (const field in props.form) {
      const id = `create-${props.model.toLowerCase()}-${props.form[field].id}`;

      return (
        <div>
          <label htmlFor={id}></label>
          <input
            id={id}
            name={field}
            type={props.form[field].type}
            {props.form[field].type === 'checkbox' ? 'checked' : 'value'}
          />
        </div>
      );
    });
    // Object.entries(props.form).map(([key, value]) => {
    //   return (
    //     <div>
    //       <label htmlFor=""></label>
    //       <input type="text"/>
    //     </div>
    //   )
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(props.form).map(([key, value]) => {
        return (
          <div>
            <label></label>
            <input />
          </div>
        );
      })}
      <label htmlFor="account-name">Name</label>
      <input
        id="account-name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
      />

      <label htmlFor="account-balance">Balance</label>
      <input
        id="account-balance"
        name="balance"
        type="number"
        value={form.balance}
        onChange={handleChange}
      />

      <label htmlFor="account-credit">Credit</label>
      <input
        id="account-credit"
        name="credit"
        type="checkbox"
        checked={form.credit}
        onChange={handleChange}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
