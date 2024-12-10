import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import { initiateUser, removeUser } from "./store";
import Blog from "./components/Blog";
import { showNotification } from "./store";
import { Routes, Route, Link } from "react-router-dom";
import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import User from "./components/User";

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initiateUser());
  }, []);

  if (user === null) {
    return <LoginForm />;
  } else {
    return (
      <div>
        <Navigation />
        {notification}
        <Routes>
          <Route path="/" element={<BlogList user={user} />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </div>
    );
  }
};
export default App;
