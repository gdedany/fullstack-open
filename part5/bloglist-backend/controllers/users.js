const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (!password) {
    response.status(400).json({ error: "password is required" });
  } else if (password.length < 3) {
    response
      .status(400)
      .json({ error: "password should be at least 3 characters long" });
  }

  if (!username) {
    response.status(400).json({ error: "username is required" });
  } else if (username.length < 3) {
    response
      .status(400)
      .json({ error: "username should be at least 3 characters long" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name,
    username,
    passwordHash,
  });
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.status(200).json(users);
});
module.exports = usersRouter;
