import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";
import { useEffect } from "react";
const Books = () => {
  const [genres, setGenres] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const selectGenre = (filter) => {
    setSelectedGenre(filter);
    setDisplayedBooks(
      displayedBooks.filter((book) => book.genres.includes(filter))
    );
  };

  useEffect(() => {
    if (result.data) {
      const newBooks = result.data.allBooks;
      if (!selectedGenre) {
        setDisplayedBooks(newBooks);
        const mappedGenres = newBooks.map((book) => book.genres);
        setGenres([...new Set(mappedGenres.flat(1))]);
      } else {
        setDisplayedBooks(
          newBooks.filter((book) => book.genres.includes(selectedGenre))
        );
      }
    }
  }, [result.data, selectedGenre]);

  if (result.loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {displayedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <GenreButtons
        genres={genres}
        selectGenre={selectGenre}
        selectedGenre={selectedGenre}
      />
      {genres && (
        <button
          onClick={() => {
            setDisplayedBooks(displayedBooks);
            setSelectedGenre(null);
          }}
        >
          show all
        </button>
      )}
    </div>
  );
};
const selectedButton = {
  backgroundColor: "transparent",
};
const GenreButtons = ({ genres, selectGenre, selectedGenre }) => {
  return genres?.map((genre, i) => {
    return (
      <i key={i}>
        <button
          onClick={() => selectGenre(genre)}
          style={genre === selectedGenre ? selectedButton : null}
        >
          {genre}
        </button>
      </i>
    );
  });
};
export default Books;
