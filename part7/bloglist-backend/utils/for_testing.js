const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const initialBlogs = [
  { title: "Title 1", author: "String", url: "String", likes: 2 },
  { title: "Title 2", author: "String", url: "String", likes: 2 },
  { title: "Title 3", author: "String", url: "String", likes: 2 },
  { title: "Title 4", author: "String", url: "String", likes: 2 },
];
const getAllBlogs = async () => {
  const response = await Blog.find({});
  return response;
};
const fillWithInitialBlogs = async () => {
  await Blog.deleteMany({});
  const user = await User.findOne();
  const blogs = initialBlogs.map((blog) => {
    return { ...blog, user: user._id };
  });

  const blogObjects = blogs.map((blog) => new Blog(blog));
  const promisesArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promisesArray);
};

const initialUsers = [
  { name: "Alice Doe", username: "alice123", password: "password123" },
  { name: "Bob Smith", username: "bob_smith", password: "securepass" },
  { name: "Charlie Brown", username: "charlie.b", password: "mypassword" },
];

const fillWithInitialUsers = async () => {
  await User.deleteMany({});
  const saltRounds = 10;
  const usersPromises = initialUsers.map(async (user) => {
    const passwordHash = await bcrypt.hash(user.password, saltRounds);
    return { ...user, passwordHash };
  });
  const users = await Promise.all(usersPromises);
  const userObjects = users.map(
    (user) =>
      new User({
        username: user.username,
        name: user.name,
        passwordHash: user.passwordHash,
      })
  );
  const promiseArray = userObjects.map((user) => user.save());
  await Promise.all(promiseArray);
};
const getValidToken = async () => {
  const user = await User.findOne();
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  return token;
};

module.exports = {
  getAllBlogs,
  fillWithInitialUsers,
  getValidToken,
  fillWithInitialBlogs,
};
