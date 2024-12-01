import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import { sortBy } from "lodash";

const App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);
  const handleUserChange = (newUser) => {
    setUser(newUser);
  };
  const setNotification = (message) => {
    setMessage(message);
    setTimeout(() => setMessage(""), 3000); // Clear notification after 5 seconds
  };
  const refreshBlogs = () => {
    blogService
      .getAll()
      .then((blogs) => {
        const sortedBlogs = sortBy(blogs, "likes");
        setBlogs(sortedBlogs.reverse());
      })
      .catch((error) => setNotification(error.description));
  };
  const logout = () => {
    try {
      loginService.logout();
      setUser(null);
      blogService.setToken(null);
    } catch (error) {
      setNotification(error);
    }
  };
  useEffect(() => {
    const user = loginService.getUserJson();
    if (user) {
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    refreshBlogs();
  }, user);
  if (user === null) {
    return <LoginForm handleUserChange={handleUserChange} />;
  } else {
    return (
      <div>
        Hi {user.name} <button onClick={logout}>Logout</button>
        <h2>blogs</h2>
        {message}
        <div>
          <BlogForm
            refresh={refreshBlogs}
            setNotification={(err) => setNotification(err)}
          />
        </div>
        <div className="blogList">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              refreshBlogs={refreshBlogs}
              showRemoveButton={user.id === blog.user.id}
            />
          ))}
        </div>
      </div>
    );
  }
};
export default App;
