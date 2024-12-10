import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";
const mockFn = vi.fn();
const mockFn2 = vi.fn();
const mockFn3 = vi.fn();

test("form calls the event handler it received as props with the right details when a new blog is created", async () => {
  render(
    <BlogForm setNotification={mockFn} refresh={mockFn2} testForm={mockFn3} />
  );
  const titleInput = screen.getByPlaceholderText("enter title");
  const authorInput = screen.getByPlaceholderText("enter author");
  const urlInput = screen.getByPlaceholderText("enter url");
  const user = userEvent.setup();
  await userEvent.type(titleInput, "test title");
  await userEvent.type(authorInput, "test author");
  await userEvent.type(urlInput, "test url");

  const button = screen.getByText("create");
  await user.click(button);

  expect(mockFn3.mock.calls).toHaveLength(1);
  expect(mockFn3.mock.calls[0][0]).toBe("test title");
  expect(mockFn3.mock.calls[0][1]).toBe("test author");
  expect(mockFn3.mock.calls[0][2]).toBe("test url");
});
