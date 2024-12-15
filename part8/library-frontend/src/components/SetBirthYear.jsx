import { ALL_AUTHORS, SET_BIRTHYEAR } from "../queries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";
const SetBirthYear = ({ authors }) => {
  const [setBirthYear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [ALL_AUTHORS],
  });
  const options = authors.map((author) => ({
    label: author.name,
    value: author.name,
  }));
  const [selectedAuthor, setSelectedAuthor] = useState(options[0]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = selectedAuthor.label;
    const born = event.target.born.value;
    setBirthYear({ variables: { name, setBornTo: Number(born) } });
  };
  return (
    <div>
      <h1>Set birthyear</h1>
      <form onSubmit={handleSubmit}>
        <span>name</span>
        <Select
          defaultValue={options[0]}
          onChange={setSelectedAuthor}
          options={options}
        />
        <span>born</span>
        <input name={"born"} />
        <br />
        <button> update author</button>
      </form>
    </div>
  );
};

export default SetBirthYear;
