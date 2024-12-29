import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { PostsProvider } from "./contexts/PostsContext";
import { ModalProvider } from "./contexts/ModalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ModalProvider>
      <UserProvider>
        <PostsProvider>
        <App />
        </PostsProvider>
      </UserProvider>
    </ModalProvider>
  </Router>
);
reportWebVitals();
