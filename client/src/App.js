import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// import { fruits } from './testData';

import NewTransactionForm from './components/NewTransactionForm';
import TransactionTable from './components/TransactionTable';
import NewUserForm from './components/NewUserForm';

function App() {
  const [testData, setTestData] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newFruit = {
      name: name,
      quantity: Number(quantity),
      price: price,
    };
    setTestData(testData.concat(newFruit));
  };

  const handleClick = () => {
    axios.get('http://localhost:8000/fruits').then((res) => {
      setTestData(res.data);
    });
  };

  const createUser = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8000/users', {
        firstName: firstName,
        lastName: lastName,
        email: email,
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container">
      {/* <NewTransactionForm name={name} setName={setName} quantity={quantity} setQuantity={setQuantity} price={price} setPrice={setPrice} handleSubmit={handleSubmit} /> */}
      <div className="forms">
        <NewUserForm 
        firstName={firstName} 
        setFirstName={setFirstName} 
        lastName={lastName} 
        setLastName={setLastName} 
        email={email} 
        setEmail={setEmail} 
        createUser={createUser} 
        />
      </div>
      <TransactionTable testData={testData} />
      {/* <div>
        <button onClick={handleClick}>Send Request</button>
        <p id="text-response"></p>
      </div> */}
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
