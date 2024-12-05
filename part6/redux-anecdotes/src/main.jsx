import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { filterSlice, anecdoteSlice, notificationSlice } from "./store";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice.reducer,
    filter: filterSlice.reducer,
    notification: notificationSlice.reducer,
  },
});
console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
