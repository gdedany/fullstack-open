import { useEffect, useState } from "react";
import { ALL_BOOKS, ME } from "../queries";
import { useQuery } from "@apollo/client";

const Recommendations = () => {
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const response = useQuery(ALL_BOOKS, { variables: { genre: favoriteGenre } });
  const result = useQuery(ME);
  useEffect(() => {
    if (response.data) {
      setDisplayedBooks(response.data.allBooks);
    }
  }, [response.data]);
  useEffect(() => {
    if (result.data) {
      setFavoriteGenre(result.data.me.favoriteGenre);
    }
  }, [result.data]);
  if (!result.data) {
    return <div>loading...</div>;
  }
  return (
    <>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
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
    </>
  );
};
export default Recommendations;
