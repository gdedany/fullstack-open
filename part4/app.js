const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const logger = require("./utils/logger");
const cors = require("cors");

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
logger.info("connecting");
mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    logger.info("connected!");
  })
  .catch((error) => {
    logger.error("error connecting to mongo!", error.message);
  });

const middleware = require("./utils/middleware");
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
