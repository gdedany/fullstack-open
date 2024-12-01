import { useState, useRef } from "react";
import Togglable from "./Togglable";
import blogsService from "../services/blogs";
const BlogForm = (props) => {
  const blogFormRef = useRef();

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
      if (typeof props.testForm === "function") {
        props.testForm(title, author, url);
      } else {
        const response = await blogsService.create({ title, author, url });
        props.refresh();
        blogFormRef.current.toggleVisibility();

        props.setNotification(
          `blog ${response.title} by ${response.author} added`
        );
      }
    } catch (error) {
      console.log(error);
      props.setNotification(error.message);
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
