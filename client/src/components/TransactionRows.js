function TransactionRows(props) {
  return props.transactions.map((transaction, i) => {
    const date = new Date(transaction.date);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    return (
      <tr className={transaction.type} key={i}>
        <td>{`$${transaction.amount.toFixed(2)}`}</td>
        <td>{transaction.payee.name}</td>
        <td>{formattedDate}</td>
        <td>{transaction.cleared ? 'true' : 'false'}</td>
      </tr>
    );
  });
}

export default TransactionRows;
