import { useState } from "react";
import PropTypes from "prop-types";
import blogsService from "../services/blogs";
const Blog = ({ blog, refreshBlogs, likeTester, showRemoveButton }) => {
  const [visibility, setVisibility] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(blog);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleDelete = async () => {
    try {
      if (
        window.confirm(`remove ${currentBlog.name} by ${currentBlog.author}?`)
      ) {
        const response = await blogsService.deleteBlog(
          currentBlog.id,
          currentBlog
        );
        await refreshBlogs();
      }
    } catch (error) {
      console.log(
        "error during deletion. I could have put a function to set the error message but it's too easy for me :D "
      );
    }
  };
  const addLike = async () => {
    if (likeTester) {
      likeTester();
    } else {
      const response = await blogsService.update(blog.id, {
        ...currentBlog,
        likes: currentBlog.likes + 1,
      });
      setCurrentBlog(response.data);
    }
  };

  return (
    <div className="single-blog">
      <div style={blogStyle}>
        {currentBlog.title} {currentBlog.author}{" "}
        <button onClick={() => setVisibility(!visibility)}>
          {visibility ? "hide" : "view"}
        </button>
        {visibility && (
          <div>
            {currentBlog.url}
            <br />

            <span className="likesAmount">likes {currentBlog.likes} </span>
            <button onClick={() => addLike()}>like</button>
            <br />
            {currentBlog.user.name}
            {showRemoveButton && <button onClick={handleDelete}>remove</button>}
          </div>
        )}
      </div>
    </div>
  );
};
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  refreshBlogs: PropTypes.func.isRequired,
  likeTester: PropTypes.func,
  showRemoveButton: PropTypes.bool.isRequired,
};
export default Blog;
