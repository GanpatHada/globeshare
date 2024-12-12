import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { ModalProvider } from "./contexts/ModalContext";
import { PostProvider } from "./contexts/PostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ModalProvider>
    <UserProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </UserProvider>
    </ModalProvider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
