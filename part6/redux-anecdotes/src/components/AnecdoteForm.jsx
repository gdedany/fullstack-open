import { createAnecdote } from "../store";
import { useDispatch } from "react-redux";
const AnecdoteForm = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>create new</h2>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          dispatch(createAnecdote(event.target.anecdote.value));
          event.target.anecdote.value = "";
        }}
      >
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
