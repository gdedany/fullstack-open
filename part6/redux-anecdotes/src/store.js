import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

export const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    appendVote(state, action) {
      const anecdote = action.payload;
      return state.map((a) =>
        a.id === anecdote.id
          ? {
              ...anecdote,
            }
          : a
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const filterSlice = createSlice({
  name: "filter",
  initialState: "ALL",
  reducers: {
    setFilter(state, action) {
      const filter = action.payload;
      return filter;
    },
  },
});
export const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      const notification = action.payload;
      return notification;
    },
    removeNotification() {
      return "";
    },
  },
});
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes.data));
  };
};
export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const response = await anecdoteService.createAnecdote(anecdote);
    dispatch(appendAnecdote(response.data));
  };
};
export const vote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const response = await anecdoteService.updateAnecdote(newAnecdote);
    dispatch(appendVote(response.data));
  };
};
export const showNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(setNotification(`new anecdote '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};
export const { appendVote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;
export const { setNotification, removeNotification } =
  notificationSlice.actions;
export const { setFilter } = filterSlice.actions;
