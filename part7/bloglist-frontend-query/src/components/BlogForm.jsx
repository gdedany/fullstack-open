import { useState, useRef } from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import blogsService from "../services/blogs";
import { showNotification } from "../notificationContext";
import { useNotificationDispatch } from "../notificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const BlogForm = (props) => {
  const blogFormRef = useRef();
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: async (newBlog) => {
      const response = await blogsService.create({ ...newBlog, likes: 0 });
      console.log("response.data :", response);
      return response;
    },
    onError: (error) => {
      showNotification(notificationDispatch, error);
    },
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
      console.log("newBlog :", newBlog);
      showNotification(
        notificationDispatch,
        `blog ${newBlog.title} by ${newBlog.author} added`
      );
      blogFormRef.current.toggleVisibility();
    },
  });
  const notificationDispatch = useNotificationDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };
  const handleCreateBlog = async (event) => {
    try {
      event.preventDefault();
      newBlogMutation.mutate({ title, author, url });
    } catch (error) {
      console.log(error);
      showNotification(notificationDispatch, error.message);
    } finally {
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };
  return (
    <div>
      <Togglable buttonLabel={"create blog"} ref={blogFormRef}>
        <form onSubmit={handleCreateBlog}>
          <span> title </span>
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder={"enter title"}
          />
          <br />
          <span> author </span>
          <input
            value={author}
            onChange={handleAuthorChange}
            placeholder={"enter author"}
          />
          <br />
          <span> url </span>{" "}
          <input
            value={url}
            onChange={handleUrlChange}
            placeholder={"enter url"}
          />
          <br />
          <button type="submit"> create</button>
        </form>
      </Togglable>
    </div>
  );
};
export default BlogForm;
