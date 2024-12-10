import loginService from "../services/login";
import { useState } from "react";
import { useUserDispatch } from "../userContext";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userDispatch = useUserDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      userDispatch({ type: "setUser", payload: user });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <span>username</span>
          <input
            value={username}
            onChange={handleUsernameChange}
            placeholder={"enter your username"}
          />
        </div>
        <div>
          <span>password</span>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder={"enter your password"}
          />
        </div>
        <button>log in</button>
        <div>{errorMessage}</div>
      </form>
    </div>
  );
};

export default LoginForm;
