// @ts-check
const { test, describe, expect, beforeEach } = require("@playwright/test");
const testUser = {
  name: "test user",
  username: "test",
  password: "password",
};
const secondTestUser = {
  name: "test user 2",
  username: "test2",
  password: "password",
};
const createInitialUser = async (page, testUserData) => {
  const response = await page.request.post("http://localhost:5173/api/users/", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: testUserData.name,
      username: testUserData.username,
      password: testUserData.password,
    },
  });
};

const login = async (page) => {
  const response = await page.request.post("http://localhost:5173/api/login", {
    data: {
      username: testUser.username,
      password: testUser.password,
    },
  });
  const responseBody = await response.json();

  return responseBody.token;
};
const initialBlog = {
  title: "Title 1",
  author: "String",
  url: "String",
  likes: 1,
};
const secondInitialBlog = {
  title: "Title 2",
  author: "String",
  url: "String",
  likes: 2,
};
const thirdInitialBlog = {
  title: "Title 3",
  author: "String",
  url: "String",
  likes: 3,
};

const createInitialBlog = async (page, token, blogData) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  await page.request.post("http://localhost:5173/api/blogs", {
    data: blogData,
    ...config,
  });
};

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.request.post("http://localhost:5173/api/tests/reset");
    await createInitialUser(page, testUser);
    await createInitialUser(page, secondTestUser);
    const token = await login(page);
    await createInitialBlog(page, token, initialBlog);
    await createInitialBlog(page, token, secondInitialBlog);
    await createInitialBlog(page, token, thirdInitialBlog);
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByPlaceholder("enter your password")).toBeVisible();
    await expect(page.getByPlaceholder("enter your username")).toBeVisible();
    await expect(page.getByRole("button", { name: "log in" })).toBeVisible();
  });
  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page
        .getByPlaceholder("enter your username")
        .fill(testUser.username);
      await page
        .getByPlaceholder("enter your password")
        .fill(testUser.password);
      await page.getByRole("button", { name: "log in" }).click();
      await expect(page.getByText(`Hi ${testUser.name}`)).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByPlaceholder("enter your username").fill("1");
      await page.getByPlaceholder("enter your password").fill("wrongPassword");
      await page.getByRole("button", { name: "log in" }).click();
      await expect(
        page.getByText("invalid username or password")
      ).toBeVisible();
    });
    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await page
          .getByPlaceholder("enter your username")
          .fill(testUser.username);
        await page
          .getByPlaceholder("enter your password")
          .fill(testUser.password);
        await page.getByRole("button", { name: "log in" }).click();
      });

      test("a new blog can be created", async ({ page }) => {
        await page.getByRole("button", { name: "create blog" }).click();
        await page.getByPlaceholder("enter title").fill("random title");
        await page.getByPlaceholder("enter author").fill("random author");
        await page.getByPlaceholder("enter url").fill("random url");
        await page.getByRole("button", { name: "create" }).click();
        const blogList = await page.locator(".blogList");
        await expect(blogList).toContainText("random title random author");
      });
      test("a blog can be liked", async ({ page }) => {
        const blogList = await page.locator(".single-blog");
        const blog = await blogList.first();

        await blog.getByRole("button", { name: "view" }).click();
        const likesAmount = await page.locator(".likesAmount").textContent();
        const likesNumberBefore = Number(likesAmount.replace("likes ", ""));
        const expectedLikesStringAfter = `likes ${likesNumberBefore + 1}`;
        await page.getByRole("button", { name: "like" }).click();
        await page.locator(".likesAmount").waitFor();
        await expect(page.locator(".likesAmount")).toHaveText(
          expectedLikesStringAfter
        );
      });
      test("a blog can be deleted by the user who created it", async ({
        page,
      }) => {
        page.on("dialog", async (dialog) => {
          await dialog.accept();
        });
        await page.getByRole("button", { name: "create blog" }).click();
        await page.getByPlaceholder("enter title").fill("random title");
        await page.getByPlaceholder("enter author").fill("random author");
        await page.getByPlaceholder("enter url").fill("random url");
        await page.getByRole("button", { name: "create" }).click();
        const blogList = await page.locator(".blogList");
        const blog = await blogList.getByText("random title random author");

        await blog.getByRole("button", { name: "view" }).click();
        await blog.getByRole("button", { name: "remove" }).click();

        await expect(blog).toBeHidden();
      });
      test("but a blog cannot be deleted by another user", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();
        await page
          .getByPlaceholder("enter your username")
          .fill(secondTestUser.username);
        await page
          .getByPlaceholder("enter your password")
          .fill(secondTestUser.password);
        await page.getByRole("button", { name: "log in" }).click();
        const blog = await page.locator(".single-blog").first();
        await blog.getByRole("button", { name: "view" }).click();
        await expect(blog.getByRole("button", { name: "remove" })).toBeHidden();
      });
      test.only("the blogs are arranged in the order according to the likes, the blog with the most likes first", async ({
        page,
      }) => {
        const buttons = await page
          .locator(".single-blog")
          .getByRole("button", { name: "view" });
        await expect(buttons.first()).toBeVisible();
        const buttonCount = await buttons.count();
        for (let i = 0; i < buttonCount; i++) {
          await buttons.first().click();
          console.log("clicked");
        }
        const blogList = await page.locator(".single-blog");
        const likeStrings = await blogList.locator("span").allTextContents();
        const likesArray = likeStrings.map((e) =>
          Number(e.replace("likes ", ""))
        );
        console.log("likesArray :", likesArray);
        expect(likesArray).toEqual(likesArray.sort().reverse())
      });
    });
  });
});
