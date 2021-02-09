function TransactionRows(props) {
  return props.testData.map((fruit, i) => {
    return (
      <tr key={i}>
        <td>{fruit.name}</td>
        <td>{fruit.quantity}</td>
        <td>{fruit.price}</td>
      </tr>
    );
  });
}

export default TransactionRows;
