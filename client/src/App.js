import React, { useState } from 'react';
import './App.css';

import { fruits } from './testData';

import NewTransactionForm from './components/NewTransactionForm';
import TransactionTable from './components/TransactionTable';

function App() {
  const [testData, setTestData] = useState(fruits);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Add this data to the table: ${name}, ${quantity}, and ${price}.`);
    const newFruit = {
      name: name,
      quantity: Number(quantity),
      price: price,
    };
    console.log(testData);
    setTestData(testData.concat(newFruit));
    console.log(testData);
  };

  return (
    <div className="container">
      <NewTransactionForm name={name} setName={setName} quantity={quantity} setQuantity={setQuantity} price={price} setPrice={setPrice} handleSubmit={handleSubmit} />
      <TransactionTable testData={testData} />
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
