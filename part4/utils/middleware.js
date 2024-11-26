const logger = require("./logger");
const jwt = require("jsonwebtoken");
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
const userExtractor = (request, response, next) => {
  try {
    const bearerToken = request.headers.authorization;
    const extractedToken = bearerToken.substring(bearerToken.indexOf(" ") + 1);
    request.user = jwt.verify(extractedToken, process.env.SECRET);
    next();
  } catch (error) {
    error.name = "AuthenticationError";
    next(error);
  }
};
const errorHandler = (error, request, response, next) => {
  if (error.name == "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else if (error.name == "ValidationError") {
    response.status(400).send({ error: error.message });
  } else if (error.name == "JsonWebTokenError") {
    response.status(401).send({ error: error.message });
  } else if (error.name == "AuthenticationError") {
    response.status(401).send({ error: "Not authorized" });
  } else if ((error.name = "ForbiddenError")) {
    response.status(403).send({ error: "Not allowed" });
  }
  next(error);
};
module.exports = {
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
