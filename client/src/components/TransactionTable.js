import { TransactionRow } from './TransactionRow';

export const TransactionTable = (props) => {
  const transactionRows = props.transactions.map((transaction) => {
    return <TransactionRow
      transaction={transaction}
      currentUserId={props.currentUserId}
      currentAccountId={props.currentAccountId}
      updateUsers={props.updateUsers}
      key={transaction._id}
    />;
  });

  return (
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
  );
};
