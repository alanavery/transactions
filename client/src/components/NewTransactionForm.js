function NewTransactionForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" value={props.name} onChange={(event) => props.setName(event.target.value)} />
      <label htmlFor="quantity">Quantity</label>
      <input id="quantity" type="number" value={props.quantity} onChange={(event) => props.setQuantity(event.target.value)} />
      <label htmlFor="price">Price</label>
      <input id="price" type="text" value={props.price} onChange={(event) => props.setPrice(event.target.value)} />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default NewTransactionForm;
