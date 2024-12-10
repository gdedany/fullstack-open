import { createSlice } from "@reduxjs/toolkit";
import blogService from "./services/blogs";
export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      localStorage.setItem("loggedUser", JSON.stringify(action.payload));

      return action.payload;
    },
    removeUser(state, action) {
      return null;
    },
  },
});
export const initiateUser = () => {
  return async (dispatch) => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    if (user) {
      dispatch(setUser(user));
      console.log(user);
    }
  };
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});
export const showNotification = (notification) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => dispatch(removeNotification()), 3000);
  };
};
export const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
  },
});

export const updateHelper = (blog) => {
  return async (dispatch) => {
    const response = await blogService.update(blog);
    dispatch(updateBlog(response.data));
  };
};

export const removeBlogHelper = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(removeBlog(id));
  };
};

export const createBlogHelper = (blog) => {
  return async (dispatch) => {
    console.log(blog);
    const response = await blogService.create(blog);
    dispatch(createBlog(response));
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();

    dispatch(setBlogs(response));
  };
};
export const { setBlogs, updateBlog, createBlog, removeBlog } =
  blogSlice.actions;
export const { setNotification, removeNotification } =
  notificationSlice.actions;
export const { setUser, removeUser } = userSlice.actions;
