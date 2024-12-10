import { useSelector, useDispatch } from "react-redux";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { Link } from "react-router-dom";
import { showNotification } from "../store";
import { removeUser } from "../store";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const logout = () => {
    try {
      loginService.logout();
      dispatch(removeUser());
      blogService.setToken(null);
    } catch (error) {
      console.log(error);
      dispatch(showNotification());
    }
  };
  if (!user) return null;
  return (
    <div>
      <Navbar>
        <Navbar.Brand>Blog App</Navbar.Brand>
        <Nav className="me-5">
          <Nav.Link>
            <Link to={"/"}> blogs</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={"/users"}> users</Link>
          </Nav.Link>
        </Nav>
        {user.name} logged in{" "}
        <Button variant="danger" onClick={logout}>
          Logout
        </Button>
      </Navbar>
    </div>
  );
};
export default Navigation;
