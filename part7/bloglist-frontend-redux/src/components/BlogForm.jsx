import { useState, useRef } from "react";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { showNotification } from "../store";
import { createBlogHelper } from "../store";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const BlogForm = (props) => {
  const blogFormRef = useRef();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
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
        dispatch(createBlogHelper({ author, url, title }));
        blogFormRef.current.toggleVisibility();

        dispatch(showNotification(`blog ${title} by ${author} added`));
      }
    } catch (error) {
      console.log(error);
      dispatch(showNotification(error.message));
    } finally {
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };
  return (
    <div>
      <Togglable buttonLabel={"create blog"} ref={blogFormRef}>
        <Form onSubmit={handleCreateBlog}>
          <Form.Label> title </Form.Label>
          <Form.Control
            value={title}
            onChange={handleTitleChange}
            placeholder={"enter title"}
          />
          <br />
          <Form.Label> author </Form.Label>
          <Form.Control
            value={author}
            onChange={handleAuthorChange}
            placeholder={"enter author"}
          />
          <br />
          <Form.Label> url </Form.Label>{" "}
          <Form.Control
            value={url}
            onChange={handleUrlChange}
            placeholder={"enter url"}
          />
          <br />
          <Button className="widerButton mb-3" type="submit">
            {" "}
            create
          </Button>
        </Form>
      </Togglable>
    </div>
  );
};
export default BlogForm;
