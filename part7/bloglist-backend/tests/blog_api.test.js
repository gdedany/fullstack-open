const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("../utils/for_testing");

beforeEach(async () => {
  await helper.fillWithInitialUsers();
  await helper.fillWithInitialBlogs();
});

test("getAll returns the correct number of blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, 4);
});
test("returns property named id", async () => {
  const response = await api.get("/api/blogs");
  const hasPropertyId = Boolean(response.body[0].id);
  assert.strictEqual(hasPropertyId, true);
});
test("post request with a valid token successfully creates a blog and total length increases", async () => {
  const allBlogsBefore = await helper.getAllBlogs();
  const lengthAfter = allBlogsBefore.length + 1;
  const blog = { title: "Title 5", author: "test", url: "test", likes: 5 };
  const token = await helper.getValidToken();
  const response = await api
    .post("/api/blogs")
    .send(blog) // Attach the JSON body
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .expect(201); // Expect a 201 status code
  const allBlogsAfter = await helper.getAllBlogs();
  assert.strictEqual(lengthAfter, allBlogsAfter.length);
  const titles = allBlogsAfter.map((b) => b.title);
  assert(titles.includes("Title 5"));
});
test("post request with an invalid token returns 401 and proper error description", async () => {
  const blog = { title: "Title 5", author: "test", url: "test", likes: 5 };
  const response = await api
    .post("/api/blogs/")
    .send(blog)
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer thisIsDefinetelyAnInvalidToken`)
    .expect(401);
  assert.strictEqual(response.body.error, "Not authorized");
});

test("if likes property in a new blog is missing, it will default to 0", async () => {
  const blog = { title: "Title 5", author: "test", url: "test" };
  const response = await api
    .post("/api/blogs")
    .send(blog)
    .set("Content-Type", "application/json")
    .expect(201);
  assert.strictEqual(response.body.likes, 0);
});
test("returns 400 if title is missing", async () => {
  const blog = { author: "test", url: "test" };
  await api.post("/api/blogs").send(blog).expect(400);
});
test("returns 400 if url is missing", async () => {
  const blog = { title: "Title 5", author: "test" };
  await api.post("/api/blogs").send(blog).expect(400);
});

test("trying to delete a blog with non-existent will result in 400", async () => {
  const nonExistentId = "thereIsNoWayABlogWithThisIdExists";
  await api.delete(`/api/blogs/${nonExistentId}`).expect(400);
});

test("successfull delete results in 204", async () => {
  const blogs = await helper.getAllBlogs();
  const existingBlogId = blogs[0]._id;
  await api.delete(`/api/blogs/${existingBlogId}`).expect(204);
});
test("updating a blog likes and title functions", async () => {
  const blogs = await helper.getAllBlogs();
  const existingBlogId = blogs[0]._id;
  const updatedBlog = {
    title: "Updated Title",
    author: "test",
    url: "test",
    likes: 9999,
  };
  const response = await api
    .put(`/api/blogs/${existingBlogId}`)
    .send(updatedBlog)
    .expect(200);
  assert.strictEqual(response.body.likes, 9999);
  assert.strictEqual(response.body.title, "Updated Title");
});
after(async () => {
  await mongoose.connection.close();
});
