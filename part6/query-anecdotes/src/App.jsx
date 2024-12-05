import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import {
  useNotificationDispatch,
  setNotification,
} from "./NotificationContext";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const voteMutation = useMutation({
    mutationFn: async (anecdote) => {
      const response = await axios.put(
        `http://localhost:3001/anecdotes/${anecdote.id}`,
        {
          ...anecdote,
          votes: anecdote.votes + 1,
        }
      );
      return response.data;
    },
    onSuccess: (newAnecdote) => {
      setNotification(notificationDispatch, `voted for ${newAnecdote.content}`);
      const anecdotes = queryClient.getQueryData(["anecdotes"]);

      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id === newAnecdote.id ? newAnecdote : anecdote
        )
      );
    },
    onError: (error) => {
      setNotification(notificationDispatch, "error voting");
    },
  });
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () =>
      axios.get("http://localhost:3001/anecdotes").then((res) => res.data),
    retry: false,
  });
  if (result.isLoading) {
    return <div> loading data... </div>;
  }
  if (result.isError) {
    return <div> oh no... error </div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                voteMutation.mutate(anecdote);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
