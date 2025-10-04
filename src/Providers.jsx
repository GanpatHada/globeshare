import { UserProvider } from "./contexts/UserContext";
import { PostsProvider } from "./contexts/PostsContext";
import { ModalProvider } from "./contexts/ModalContext";
import { DialogProvider } from "./contexts/DialogContext";
import { MenuProvider } from "./contexts/MenuContext";
import { SearchProvider } from "./contexts/SearchContext";
import { NotificationProvider } from "./contexts/NotificationContext";

const Providers = ({ children }) => {
  return (
    <NotificationProvider>
      <UserProvider>
        <PostsProvider>
          <ModalProvider>
            <MenuProvider>
              <DialogProvider>
                <SearchProvider>{children}</SearchProvider>
              </DialogProvider>
            </MenuProvider>
          </ModalProvider>
        </PostsProvider>
      </UserProvider>
    </NotificationProvider>
  );
};

export default Providers;
