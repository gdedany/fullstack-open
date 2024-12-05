import { vote, showNotification } from "../store";
import { useSelector, useDispatch } from "react-redux";
import sortBy from "lodash/sortBy";

const AnecdoteList = () => {
  const unsortedAnecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const filteredAnecdotes =
    filter === "ALL"
      ? unsortedAnecdotes
      : unsortedAnecdotes.filter((a) => a.content.includes(filter));

  const anecdotes = sortBy(filteredAnecdotes, "votes").reverse();
  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(vote(anecdote));

                dispatch(
                  showNotification(`you voted for '${anecdote.content}'`, 3)
                );
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
export default AnecdoteList;
