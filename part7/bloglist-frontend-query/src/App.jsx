import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import { showNotification } from "./notificationContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useNotificationValue } from "./notificationContext";
import { useNotificationDispatch } from "./notificationContext";
import { useUserDispatch, useUserValue, initializeUser } from "./userContext";
const App = () => {
  const userDispatch = useUserDispatch();
  const notification = useNotificationValue();
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  useEffect(() => {
    initializeUser(userDispatch);
  }, []);

  const blogMutation = useMutation({
    mutationFn: async (blog) => {
      const response = await blogService.update(blog);
      return response.data;
    },
    onSuccess: (newBlog) =>
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) => (blog.id === newBlog.id ? newBlog : blog))
      ),
    onError: (error) => {
      showNotification(notificationDispatch, "error voting :(");
    },
  });

  const user = useUserValue();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
  if (result.isError) {
    showNotification(notificationDispatch, "error :(");
  }
  const blogs = result.data;
  console.log("blogs :", result);

  const logout = () => {
    try {
      loginService.logout();
      userDispatch({ type: "removeUser" });
      blogService.setToken(null);
    } catch (error) {
      showNotification(notificationDispatch, error);
    }
  };

  if (user === null) {
    return <LoginForm />;
  } else {
    return (
      <div>
        Hi {user.name} <button onClick={logout}>Logout</button>
        <h2>blogs</h2>
        {notification}
        <div>
          <BlogForm />
        </div>
        <div className="blogList">
          {blogs &&
            blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                showRemoveButton={user.id === blog.user.id}
                blogMutation={blogMutation}
              />
            ))}
        </div>
      </div>
    );
  }
};
export default App;
