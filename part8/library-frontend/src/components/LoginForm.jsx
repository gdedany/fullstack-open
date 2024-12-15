const LoginForm = ({ login }) => {
  const handlelogin = () => {
    const username = event.target.username.value;
    const password = event.target.password.value;
    event.target.username.value = "";
    event.target.password.value = "";
    event.preventDefault();
    login(username, password);
  };
  return (
    <form onSubmit={handlelogin}>
      <span>username</span>
      <input type="text" name="username" />
      <br />
      <span>password</span>
      <input type="text" name="password" />
      <br />
      <button>login</button>
    </form>
  );
};

export default LoginForm;
