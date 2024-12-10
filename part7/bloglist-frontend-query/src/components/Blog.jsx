import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import blogsService from "../services/blogs";
import {
  showNotification,
  useNotificationDispatch,
} from "../notificationContext";
const Blog = ({ blog, showRemoveButton, blogMutation }) => {
  const [visibility, setVisibility] = useState(false);
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const deleteBlogMutation = useMutation({
    mutationFn: async () => {
      const response = await blogsService.deleteBlog(blog.id);
    },
    onError: (error) => {
      showNotification(notificationDispatch, "error during deletion");
    },
    onSuccess: () => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((b) => blog.id !== b.id)
      );
    },
  });

  const handleDelete = async () => {
    try {
      if (window.confirm(`remove ${blog.name} by ${blog.author}?`)) {
        console.log("blog :", blog);
        deleteBlogMutation.mutate(blog);
      }
    } catch (error) {
      console.log(
        "error during deletion. I could have put a function to set the error message but it's too easy for me :D "
      );
    }
  };

  const addLike = () => {
    console.log(blog);
    blogMutation.mutate({ ...blog, likes: blog.likes + 1 });
  };
  return (
    <div className="single-blog">
      <div style={blogStyle}>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setVisibility(!visibility)}>
          {visibility ? "hide" : "view"}
        </button>
        {visibility && (
          <div>
            {blog.url}
            <br />

            <span className="likesAmount">likes {blog.likes} </span>
            <button onClick={() => addLike()}>like</button>
            <br />
            {blog.user.name}
            {showRemoveButton && <button onClick={handleDelete}>remove</button>}
          </div>
        )}
      </div>
    </div>
  );
};
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  showRemoveButton: PropTypes.bool.isRequired,
};
export default Blog;
