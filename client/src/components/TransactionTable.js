import { TransactionRows } from './TransactionRows';

export const TransactionTable = (props) => {
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
        <TransactionRows transactions={props.transactions} />
      </tbody>
    </table>
  );
};
