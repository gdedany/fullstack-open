import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
const mockFn = vi.fn();

const blog = {
  title: "Title 4",
  author: "String",
  url: "String4",
  likes: 37,
  user: {
    name: "Charlie Brown",
    username: "charlie.b",
    id: "67480f87b37baaba716f20b5",
  },
  id: "67480f88b37baaba716f20be",
};

test("only renders content visible by default", () => {
  render(<Blog blog={blog} refreshBlogs={mockFn} />);
  const title = screen.getByText("Title 4", { exact: false });
  const author = screen.getByText("String", { exact: false });
  const url = screen.queryByText("String4", { exact: false });
  const likes = screen.queryByText("likes 37", { exact: false });
  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test("hidden content is visible after button click", async () => {
  render(<Blog blog={blog} refreshBlogs={mockFn} />);
  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const url = screen.queryByText("String4", { exact: true });
  const likes = screen.queryByText("likes 37", { exact: true });
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test("if like button is clicked twice, it is handled twice", async () => {
  render(<Blog blog={blog} refreshBlogs={mockFn} likeTester={mockFn} />);
  const user = userEvent.setup();

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const button = screen.getByText("like");
  await user.click(button);
  await user.click(button);
  expect(mockFn.mock.calls).toHaveLength(2);
});
