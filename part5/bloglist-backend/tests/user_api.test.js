const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/blog");
const api = supertest(app);

beforeEach(async () => {
  User.deleteMany({});
});

test("trying to create a user with a 2 character username results in 400 and detailed error is returned", async () => {
  result = await api
    .post("/api/users")
    .send({ username: "te", password: "test", name: "aaa" })
    .expect(400);
  assert.strictEqual(
    result.body.error,
    "username should be at least 3 characters long"
  );
});
test("trying to create a user with a 2 character password results in 400 and detailed error is returned", async () => {
  result = await api
    .post("/api/users")
    .send({ username: "test", password: "te", name: "aaa" })
    .expect(400);
  assert.strictEqual(
    result.body.error,
    "password should be at least 3 characters long"
  );
});
after(async () => {
  await mongoose.connection.close();
});
