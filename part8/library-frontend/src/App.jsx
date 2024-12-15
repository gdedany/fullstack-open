import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import LoginForm from "./components/LoginForm";
import { ALL_BOOKS, BOOK_ADDED, LOGIN } from "./queries";
import Recommendations from "./components/Recommendations";
const App = () => {
  const client = useApolloClient();
  useQuery(ALL_BOOKS);

  // Set up the subscription
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      console.log(addedBook);
      client.cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: null } },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(addedBook),
          };
        }
      );
    },
  });

  const [loginMutation, result] = useMutation(LOGIN);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  useEffect(() => setToken(localStorage.getItem("loggedUser")), []);
  useEffect(() => {
    if (result.data) {
      setToken(result.data);
      localStorage.setItem("loggedUser", result.data.login.value);
    }
  }, [result.data]);
  const login = (username, password) => {
    loginMutation({ variables: { username, password } });
    navigate("/");
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    client.resetStore();
    navigate("/login");
  };
  return (
    <div>
      <div>
        <nav>
          <button onClick={() => navigate("/")}>authors</button>
          <button onClick={() => navigate("/books/")}>books</button>
          {token ? (
            <>
              <button onClick={() => navigate("/books/add")}>add book</button>
              <button onClick={() => navigate("/recommendations")}>
                recommendations
              </button>
              <button onClick={() => logout()}>logout</button>
            </>
          ) : (
            <button onClick={() => navigate("/login")}>login</button>
          )}
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/add" element={<NewBook />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/login" element={<LoginForm login={login} />} />
      </Routes>
    </div>
  );
};

export default App;
