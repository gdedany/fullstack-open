const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});
blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blogs = await Blog.findById(id).populate("user");
  response.json(blogs);
});
blogsRouter.post("/", async (request, response) => {
  const blog = request.body;
  const user = await User.findById(request.user.id);
  blog.user = user.id;
  blog.likes = blog.likes || 0;
  const newBlog = new Blog(blog);
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();
  await newBlog.save();
  const result = await Blog.findById(newBlog._id).populate("user");
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);
  if (blogToDelete.user.toString() !== request.user.id) {
    console.log(blogToDelete.user.toString());
    throw new Error("ForbiddenError");
  }
  const result = await Blog.deleteOne({ _id: request.params.id });
  response.status(204).json(result);
});

blogsRouter.put("/:id", async (request, response) => {
  const idToUpdate = request.params.id;
  const updatedBlog = request.body;
  updatedBlog.user = updatedBlog.user.id;
  const result = await Blog.findByIdAndUpdate(idToUpdate, updatedBlog, {
    new: true,
  }).populate("user");
  response.status(200).json(result);
});
module.exports = blogsRouter;
