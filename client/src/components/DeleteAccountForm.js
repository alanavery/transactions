import axios from 'axios';

export const DeleteAccountForm = (props) => {
  const handleClick = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/users/${props.currentUser._id}/accounts/${props.currentAccount._id}`);
      alert('Account deleted.');
      props.updateUsers();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h3>Delete Account</h3>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};
