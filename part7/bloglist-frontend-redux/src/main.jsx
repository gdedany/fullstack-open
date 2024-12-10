import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { blogSlice, notificationSlice, userSlice } from "./store";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Container from "react-bootstrap/Container";

const store = configureStore({
  reducer: {
    blogs: blogSlice.reducer,
    notifications: notificationSlice.reducer,
    user: userSlice.reducer,
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <Container>
        <App />
      </Container>
    </Provider>
  </Router>
);
