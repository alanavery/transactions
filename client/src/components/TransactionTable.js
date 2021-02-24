import { TransactionRow } from './TransactionRow';

export const TransactionTable = (props) => {
  const transactionRows = props.currentAccount.transactions.map((transaction) => {
    return <TransactionRow
      transaction={transaction}
      currentUserId={props.currentUser._id}
      currentAccountId={props.currentAccount._id}
      updateUsers={props.updateUsers}
      key={transaction._id}
    />;
  });

  const calculateBalance = (cleared) => {
    let balance = props.currentAccount.balance;
    let transactions;
    if (cleared) {
      transactions = props.currentAccount.transactions.filter((transaction) => transaction.cleared);
    } else {
      transactions = props.currentAccount.transactions;
    }
    transactions.forEach((transaction) => {
      if (transaction.type === 'debit') {
        balance -= transaction.amount;
      } else if (transaction.type === 'credit') {
        balance += transaction.amount;
      }
    });
    return balance;
  };

  return (
    <div>
      <h3>{props.currentAccount.name}</h3>
      <p>Starting Balance: {props.currentAccount.balance}</p>
      <p>Cleared: {calculateBalance(true)}</p>
      <p>Uncleared: {calculateBalance(false)}</p>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Payee/Payer</th>
            <th>Date</th>
            <th>Cleared</th>
          </tr>
        </thead>
        <tbody>
          {transactionRows}
        </tbody>
      </table>
    </div>
  );
};
