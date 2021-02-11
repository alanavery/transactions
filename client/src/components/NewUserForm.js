function NewUserForm(props) {
  return (
    <form onSubmit={props.addUser}>
      <label htmlFor="first-name">First Name</label>
      <input
        id="first-name"
        type="text"
        value={props.firstName}
        onChange={(event) => props.setFirstName(event.target.value)}
      />
      <label htmlFor="last-name">Last Name</label>
      <input
        id="last-name"
        type="text"
        value={props.lastName}
        onChange={(event) => props.setLastName(event.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={props.email}
        onChange={(event) => props.setEmail(event.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default NewUserForm;
