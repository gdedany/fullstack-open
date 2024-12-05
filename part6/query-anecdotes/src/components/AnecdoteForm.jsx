import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  useNotificationDispatch,
  setNotification,
} from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const newAnecdoteMutation = useMutation({
    mutationFn: async (content) => {
      const response = await axios.post("http://localhost:3001/anecdotes", {
        content,
        votes: 0,
      });
      return response.data;
    },

    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      setNotification(
        notificationDispatch,
        `added new anecdote ${newAnecdote.content}`
      );
    },
    onError: (error) => {
      setNotification(notificationDispatch, error.response.data.error);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newAnecdoteMutation.mutate(content);
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
