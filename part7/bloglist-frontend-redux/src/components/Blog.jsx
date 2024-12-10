import { removeBlogHelper, updateHelper } from "../store";
import { useDispatch } from "react-redux";
import blogsService from "../services/blogs";
import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const Blog = ({}) => {
  const navigate = useNavigate();
  const id = useParams().id;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    blogsService.getOne(id).then((response) => {
      setBlog(response);
    });
  }, []);
  const handleDelete = async () => {
    try {
      if (window.confirm(`remove ${blog.title} by ${blog.author}?`)) {
        dispatch(removeBlogHelper(blog.id));
        navigate("/");
      }
    } catch (error) {
      console.log(
        "error during deletion. I could have put a function to set the error message but it's too easy for me :D "
      );
    }
  };
  const addLike = async () => {
    const response = await blogsService.update({
      ...blog,
      likes: blog.likes + 1,
    });
    setBlog(response.data);
  };
  const handleAddComment = async (event) => {
    event.preventDefault();
    const newComment = event.target.comment.value;

    const newBlog = { ...blog, comments: blog.comments.concat(newComment) };
    const response = await blogsService.update(newBlog);
    setBlog(response.data);
    event.target.comment.value = "";
  };
  if (!blog) return <div>blog not found</div>;
  return (
    <div className="single-blog">
      <div>
        <h2>
          {blog.title} {blog.author}{" "}
        </h2>
        <div className="mb-5">
          <a href="">{blog.url}</a>
          <br />
          <span className="likesAmount">likes {blog.likes} </span>
          <Button variant="success" onClick={() => addLike()}>
            like
          </Button>
          <br />
          <div className="mt-3 mb-4">added by {blog.user.name}</div>

          {blog.user.id === user.id && (
            <Button variant="danger" onClick={handleDelete}>
              remove
            </Button>
          )}
        </div>
        <h3>comments</h3>
        <Form onSubmit={handleAddComment}>
          <InputGroup className="mb-3">
            <Form.Control name="comment" />
            <Button variant="outline-primary" id="button-addon2">
              Add Comment
            </Button>
          </InputGroup>
        </Form>
        <ListGroup>
          {blog.comments &&
            blog.comments.map((comment, i) => (
              <ListGroup.Item variant="primary" key={i}>
                {comment}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default Blog;
