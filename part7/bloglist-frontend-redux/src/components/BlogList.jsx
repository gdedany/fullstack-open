import Blog from "./Blog";
import BlogForm from "./BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeBlogs } from "../store";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const BlogList = ({ user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [user]);
  return (
    <>
      <h2>blogs</h2>

      <div>
        <BlogForm />
      </div>
      <div className="blogList">
        <ListGroup>
          {blogs.map((blog) => (
            <ListGroup.Item variant="light" key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
};

export default BlogList;
