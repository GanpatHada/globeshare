import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { PostsProvider } from "./contexts/PostsContext";
import { ModalProvider } from "./contexts/ModalContext";
import { DialogProvider } from "./contexts/DialogContext";
import "./Fonts.css";
import { MenuProvider } from "./contexts/MenuContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { SearchProvider } from "./contexts/SearchContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true, 
      }}>
    <UserProvider>
      <PostsProvider>
        <ModalProvider>
          <MenuProvider>
            <DialogProvider>
              <SearchProvider>
              <ProfileProvider>
                <App />
              </ProfileProvider>
              </SearchProvider>
            </DialogProvider>
          </MenuProvider>
        </ModalProvider>
      </PostsProvider>
    </UserProvider>
  </Router>
);
