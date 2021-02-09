import TransactionRows from './TransactionRows';

function TransactionTable(props) {
  return (
    <table>
      <tbody>
        <TransactionRows testData={props.testData} />
      </tbody>
    </table>
  );
}

export default TransactionTable;
