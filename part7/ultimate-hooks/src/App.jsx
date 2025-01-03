import { useState, useEffect } from "react";
import useResource from "./hooks/index";
const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("notes");
  const [persons, personService] = useResource("persons");
  useEffect(() => {
    console.log("executing..");
    noteService.getAll();
    personService.getAll();
  }, []);
  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes && notes.map((n) => <p key={n.id}>{n.content}</p>)}
      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons &&
        persons.map((n) => (
          <p key={n.id}>
            {n.name} {n.number}
          </p>
        ))}
    </div>
  );
};

export default App;
