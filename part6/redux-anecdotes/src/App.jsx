import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { useEffect } from "react";
import Filter from "./components/Filter";
import { initializeAnecdotes } from "./store";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;