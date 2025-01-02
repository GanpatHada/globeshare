import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { PostsProvider } from "./contexts/PostsContext";
import { ModalProvider } from "./contexts/ModalContext";
import { DialogProvider } from "./contexts/DialogContext";
import "./Fonts.css";
import { MenuProvider } from "./contexts/MenuContext";
import { ProfileProvider } from "./contexts/ProfileContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UserProvider>
      <PostsProvider>
        <ModalProvider>
          <MenuProvider>
            <DialogProvider>
              <ProfileProvider>
                <App />
              </ProfileProvider>
            </DialogProvider>
          </MenuProvider>
        </ModalProvider>
      </PostsProvider>
    </UserProvider>
  </Router>
);
reportWebVitals();
