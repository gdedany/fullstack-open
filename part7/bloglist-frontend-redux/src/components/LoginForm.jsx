import loginService from "../services/login";
import { useState } from "react";
import { setUser } from "../store";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      dispatch(setUser(user));
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
      <Form onSubmit={handleLogin}>
        <div className="loginInput">
          <Form.Label>username</Form.Label>
          <Form.Control
            value={username}
            onChange={handleUsernameChange}
            placeholder={"enter your username"}
          />
        </div>
        <div className="loginInput">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder={"enter your password"}
          />
        </div>
        <Button className="mt-3" variant="primary" type="submit">
          log in
        </Button>
        <div>{errorMessage}</div>
      </Form>
    </div>
  );
};

export default LoginForm;
