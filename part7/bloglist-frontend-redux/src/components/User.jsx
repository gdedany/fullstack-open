import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import usersService from "../services/users";
import ListGroup from "react-bootstrap/ListGroup";

const User = () => {
  const [user, setUser] = useState({});
  const id = useParams().id;
  useEffect(() => {
    const fetchUser = async () => {
      const response = await usersService.getOne(id);
      setUser(response);
    };

    fetchUser();
  }, []);
  if (!user) {
    return null;
  }

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs &&
          user.blogs.map((blog) => {
            return (
              <ListGroup.Item variant="light" key={blog.id}>
                {blog.title}
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </>
  );
};
export default User;
