import "./App.css";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./AppRoutes";
import Notification from './components/notification/Notification'
import { useNotification } from "./hooks/useNotification";

function App() {
  const {notification}=useNotification()
  return (
    <div className="App">
     {notification&&<Notification />}
      <ToastContainer
        position={"top-center"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={false}
        pauseOnHover={true}
        theme={"light"}
      />
      <AppRoutes />
    </div>
  );
}

export default App;
